import { Injectable } from '@angular/core';
import User, { UserDTO } from '../Entity/user.class';
import UserRepository from '../Repository/user-repository.interface';
import Authentication, { TokenDTO } from './authentication.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { GerdenHttpApiMapper } from '../Dto/gerdenHttpApiDto.class';

@Injectable({
  providedIn: 'root',
})
export default class GerdenHttpApi implements Authentication, UserRepository {
  mapper: GerdenHttpApiMapper = new GerdenHttpApiMapper();

  apiUrl = 'https://jsonplaceholder.typicode.com';
  leaApiUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}
  async createOne(user: User, password: string): Promise<boolean> {
    const userRegistrationDTO = this.mapper.mapToUserRegistrationDTO(
      user,
      password
    );
    try {
      const apiQuery = await this.http
        .post<any>(
          `${this.leaApiUrl}/utilisateurs/inscription`,
          userRegistrationDTO
        )
        .pipe(map((data: any) => data));
      const response = await firstValueFrom(apiQuery);
      console.log('Response from API:', response); // Ajoute ce log pour voir la réponse API
      return response?.code >= 200 && response?.code < 300;
    } catch (error) {
      console.error('Error during user registration:', error); // Affiche l'erreur pour savoir ce qui ne va pas
      return false;
    }
  }

  async emailExist(email: string): Promise<boolean> {
    const apiQuery = await this.http
      .get<any>(
        `${this.leaApiUrl}/utilisateurs/validation-email?email=${email}`
      )
      .pipe(map((data: any) => data));
    const response = await firstValueFrom(apiQuery);
    return response?.code === 202;
  }

  async authenticate(user: UserDTO): Promise<TokenDTO> {
    const apiQuery = await this.http
      .post<any>(`${this.leaApiUrl}/utilisateurs/connexion`, user)
      .pipe(map((data: any) => data));
    const response = await firstValueFrom(apiQuery);
    return response;
  }

  async refreshToken(token: string): Promise<TokenDTO> {
    try {
      const apiQuery = await this.http
        .post<any>(`${this.leaApiUrl}/utilisateurs/refresh-token`, {
          refresh: token,
        })
        .pipe(map((data: any) => data));
      const response = await firstValueFrom(apiQuery);
      console.log('Nouveau token reçu:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors du refresh du token', error);
      throw error; // Envoie l'erreur pour la gérer dans l'interface utilisateur
    }
  }
}
