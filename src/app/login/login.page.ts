import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../account/Entity/user.class';
import { AuthentificationService } from '../services/authentification.service';
import GerdenHttpApi from '../account/Service/gerden-http-api.implementation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  login: FormGroup;

  loginError: string = "Une erreur s'est produite lors de la connexion";
  isErrorDisplayed: boolean = false;

  constructor(
    private router: Router,
    private gerdenHttpService: GerdenHttpApi,
    private authenticationService: AuthentificationService
  ) {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSignIn(): Promise<void> {
    const user: UserDTO = {
      username: this.login.controls['email'].value,
      password: this.login.controls['password'].value,
    };
    try {
      const authenticationToken = await this.gerdenHttpService.authenticate(
        user
      );
      this.authenticationService.storeToken(
        authenticationToken?.accessToken,
        authenticationToken?.refresh
      );
      this.router.navigateByUrl('/tabs/account'); // Utilisez navigateByUrl pour naviguer
    } catch (e: any) {
      if (e?.error?.code === 401) {
        this.loginError = "Le mot de passe ou l'adresse email est incorrecte";
      }
      this.displayError(true);
    }
  }

  onSignUp(): void {
    this.router.navigateByUrl('/tabs/registration').then(() => {
      window.location.reload();
    }); // Utilisez navigateByUrl pour naviguer
  }

  navigateToForgotPassword(): void {
    this.router.navigateByUrl('/tabs/account'); // Utilisez navigateByUrl pour naviguer
  }

  displayError(display: boolean) {
    this.isErrorDisplayed = display;
  }
}
