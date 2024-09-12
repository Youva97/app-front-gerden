import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import GerdenHttpApi from './Service/gerden-http-api.implementation';

@Component({
  selector: 'app-account-home',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountHomePage {
  username: string;
  private decodedToken: JwtPayload;

  async ionViewWillEnter() {
    const currentTime: number = Date.now() / 1000;
    const tokenExpiration: number = this.decodedToken?.exp ?? 0;
    const isExpired: boolean = tokenExpiration < currentTime;
    if (isExpired) {
      await this.refreshToken();
    }
  }

  private async refreshToken() {
    const newToken = await this.gerdenHttpService.refreshToken(
      this.authenticationService.refreshToken
    );
    this.authenticationService.storeToken(
      newToken?.accessToken,
      newToken?.refresh
    );
  }

  constructor(
    private route: Router,
    private authenticationService: AuthentificationService,
    private gerdenHttpService: GerdenHttpApi
  ) {
    if (this.authenticationService.token) {
      this.decodedToken = jwtDecode(this.authenticationService.token);
    } else {
      this.route.navigate(['/tabs/login']);
    }
  }
}
