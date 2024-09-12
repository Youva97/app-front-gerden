import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User, { Activity, Address, UserDTO } from '../account/Entity/user.class';
import { UniqueEmailValidator } from './email-existing.directive';
import { AuthentificationService } from '../services/authentification.service';
import GerdenHttpApi from '../account/Service/gerden-http-api.implementation';

register();

const activityLabels: Record<Activity, string> = {
  [Activity.Aucun]: '- Aucun -',
  [Activity.Chomage]: 'Chômage',
  [Activity.Conges]: 'Congés Travail',
  [Activity.SansActif]: `Sans activités cause d'handicap`,
  [Activity.CDD]: 'Contrat à durée déterminé',
  [Activity.CDI]: 'Contrat à durée indéterminé',
  [Activity.Interimaire]: 'En intérim',
};

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.page.html',
  styleUrls: ['registration.page.scss'],
})
export class RegistrationPage {
  // Liste des activités et des labels liées
  activitiesLabel: Record<Activity, string> = activityLabels;
  activities = Object.values(Activity);

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  @ViewChild(IonModal)
  modal: IonModal;

  parentInformation: FormGroup;
  confirmEmail: FormGroup;

  registrationError: string = "Une erreur s'est produite lors de l'inscription";
  isErrorDisplayed: boolean = false;

  constructor(
    private router: Router,
    private gerdenHttpService: GerdenHttpApi,
    private uniqueEmailValidator: UniqueEmailValidator,
    private authenticationService: AuthentificationService
  ) {
    this.parentInformation = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      streetNumber: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [Validators.required]),
      otherAddress: new FormControl(''),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?\\d{10,15}$'),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        ],
        updateOn: 'blur',
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      activity: new FormControl('', [Validators.required]),
    });
    this.confirmEmail = new FormGroup({
      confirmationCode: new FormControl(''),
    });
  }

  validateParentForm() {
    if (this.parentInformation.valid) {
      this.swiperRef?.nativeElement.swiper.slideNext();
    } else {
      this.parentInformation.markAllAsTouched();
    }
  }

  goNext() {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  private buildAddress(): Address {
    return new Address(
      this.parentInformation.controls['streetNumber'].value,
      this.parentInformation.controls['streetName'].value,
      this.parentInformation.controls['otherAddress'].value,
      this.parentInformation.controls['postalCode'].value,
      this.parentInformation.controls['city'].value,
      this.parentInformation.controls['country'].value
    );
  }

  private buildUser(address: Address): User {
    return new User(
      null,
      this.parentInformation.controls['name'].value,
      this.parentInformation.controls['surname'].value,
      this.parentInformation.controls['phoneNumber'].value,
      this.parentInformation.controls['email'].value,
      address,
      this.parentInformation.controls['activity'].value
    );
  }

  // Méthode ou l'on envoie toute les données pour l'inscription
  async register() {
    console.log('Send data to backend for registration');
    const address = this.buildAddress();
    const user = this.buildUser(address);
    try {
      const created = await this.gerdenHttpService.createOne(
        user,
        this.parentInformation.controls['password'].value
      );
      if (created) this.goNext();
      else this.displayError(true);
    } catch (e) {
      this.displayError(true);
    }
  }

  async finishRegistration() {
    try {
      // Continue simplement le processus de création de compte
      await this.register();
      this.goNext(); // Continue sans vérification par code de confirmation
    } catch (e) {
      this.displayError(true); // Affiche une erreur si nécessaire
    }
  }

  async goToUserSpace() {
    const user: UserDTO = {
      username: this.parentInformation.controls['email'].value,
      password: this.parentInformation.controls['password'].value,
    };

    try {
      const authenticationToken = await this.gerdenHttpService.authenticate(
        user
      );
      console.log('Token reçu:', authenticationToken); // Vérifie ce que tu reçois ici

      if (authenticationToken?.accessToken && authenticationToken?.refresh) {
        this.authenticationService.storeToken(
          authenticationToken.accessToken,
          authenticationToken.refresh
        );
        this.router.navigateByUrl('/tabs/account');
      } else {
        console.error('Tokens manquants dans la réponse');
      }
    } catch (e) {
      console.error('Erreur lors de la connexion', e);
      this.displayError(true);
    }
  }

  displayError(display: boolean) {
    this.isErrorDisplayed = display;
  }
}
