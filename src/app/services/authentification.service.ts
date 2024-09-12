import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  token: string;
  refreshToken: string;

  storeToken(token: string, refreshToken: string): void {
    this.token = token;
    this.refreshToken = refreshToken;

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Méthode pour vérifier s'il existe un token stocké
  loadTokenFromStorage() {
    this.token = localStorage.getItem('accessToken') || '';
  }
}
