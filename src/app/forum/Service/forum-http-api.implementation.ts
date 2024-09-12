import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Forum, Commentaire } from '../Entity/forum.class';

@Injectable({
  providedIn: 'root',
})
export default class ForumHttpApi {
  private baseUrl = 'http://localhost:8083/forums'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer tous les forums
  async getAllForums(): Promise<Forum[]> {
    const apiQuery = this.http
      .get<Forum[]>(`${this.baseUrl}`)
      .pipe(map((data: Forum[]) => data));
    return await firstValueFrom(apiQuery);
  }

  // Récupérer un forum spécifique par ID
  async getForumById(forumId: number): Promise<Forum> {
    const apiQuery = this.http
      .get<Forum>(`${this.baseUrl}/${forumId}`)
      .pipe(map((data: Forum) => data));
    return await firstValueFrom(apiQuery);
  }

  // Créer un nouveau forum
  async createForum(forum: Forum): Promise<Forum> {
    const apiQuery = this.http
      .post<Forum>(`${this.baseUrl}/create`, forum)
      .pipe(map((data: Forum) => data));
    return await firstValueFrom(apiQuery);
  }

  // Ajouter un utilisateur au forum
  async addUserToForum(forumId: number, utilisateurId: number): Promise<Forum> {
    const apiQuery = this.http
      .post<Forum>(
        `${this.baseUrl}/${forumId}/utilisateurs/${utilisateurId}`,
        {}
      )
      .pipe(map((data: Forum) => data));
    return await firstValueFrom(apiQuery);
  }

  // Ajouter un commentaire à un forum
  async addCommentToForum(
    forumId: number,
    utilisateurId: number,
    commentaire: Commentaire
  ): Promise<Commentaire> {
    const apiQuery = this.http
      .post<Commentaire>(
        `${this.baseUrl}/${forumId}/commentaires/${utilisateurId}`,
        commentaire
      )
      .pipe(map((data: Commentaire) => data));
    return await firstValueFrom(apiQuery);
  }

  // Lister les commentaires d'un forum
  async getCommentsForForum(forumId: number): Promise<Commentaire[]> {
    const apiQuery = this.http
      .get<Commentaire[]>(`${this.baseUrl}/${forumId}/commentaires`)
      .pipe(map((data: Commentaire[]) => data));
    return await firstValueFrom(apiQuery);
  }

  // Modifier un commentaire
  async updateComment(
    commentaireId: number,
    contenu: string
  ): Promise<Commentaire> {
    const apiQuery = this.http
      .put<Commentaire>(`${this.baseUrl}/commentaires/${commentaireId}`, {
        contenu,
      })
      .pipe(map((data: Commentaire) => data));
    return await firstValueFrom(apiQuery);
  }

  // Supprimer un forum
  async deleteForum(forumId: number): Promise<void> {
    const apiQuery = this.http
      .delete<void>(`${this.baseUrl}/${forumId}`)
      .pipe(map(() => {}));
    return await firstValueFrom(apiQuery);
  }

  // Supprimer un commentaire
  async deleteComment(commentaireId: number): Promise<void> {
    const apiQuery = this.http
      .delete<void>(`${this.baseUrl}/commentaires/${commentaireId}`)
      .pipe(map(() => {}));
    return await firstValueFrom(apiQuery);
  }

  // Signaler un commentaire
  async reportComment(commentaireId: number): Promise<Commentaire> {
    const apiQuery = this.http
      .put<Commentaire>(
        `${this.baseUrl}/commentaires/${commentaireId}/signaler`,
        {}
      )
      .pipe(map((data: Commentaire) => data));
    return await firstValueFrom(apiQuery);
  }
}
