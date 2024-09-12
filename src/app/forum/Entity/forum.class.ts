import { v4 as uuid } from 'uuid';

// Classe représentant un utilisateur
export class Utilisateur {
  constructor(id?: string, nom?: string, email?: string) {
    this._id = id ? id : uuid();
    if (nom) this._nom = nom;
    if (email) this._email = email;
  }

  private _id: string;
  private _nom: string;
  private _email: string;

  public get id(): string {
    return this._id;
  }

  public get nom(): string {
    return this._nom;
  }

  public get email(): string {
    return this._email;
  }
}

// Classe représentant un commentaire
export class Commentaire {
  constructor(
    id?: string,
    contenu?: string,
    dateCreation?: Date,
    utilisateur?: Utilisateur,
    signale?: boolean
  ) {
    this._id = id ? id : uuid();
    if (contenu) this._contenu = contenu;
    if (dateCreation) this._dateCreation = dateCreation;
    if (utilisateur) this._utilisateur = utilisateur;
    this._signale = signale ?? false;
  }

  private _id: string;
  private _contenu: string;
  private _dateCreation: Date;
  private _utilisateur: Utilisateur;
  private _signale: boolean;

  public get id(): string {
    return this._id;
  }

  public get contenu(): string {
    return this._contenu;
  }

  public get dateCreation(): Date {
    return this._dateCreation;
  }

  public get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  public get signale(): boolean {
    return this._signale;
  }

  public set signale(value: boolean) {
    this._signale = value;
  }
}

// Classe représentant un forum
export class Forum {
  constructor(
    id?: string,
    type?: string,
    utilisateurs?: Utilisateur[],
    dateCreation?: Date,
    listeDeCommentaires?: Commentaire[],
    likes?: number,
    liked?: boolean // Ajout du champ liked pour suivre l'état du like
  ) {
    this._id = id ? id : uuid();
    if (type) this._type = type;
    if (dateCreation) this._dateCreation = dateCreation;
    if (utilisateurs) this._utilisateurs = utilisateurs;
    if (listeDeCommentaires) this._listeDeCommentaires = listeDeCommentaires;
    this._likes = likes ?? 0; // Initialisation des likes à 0 si non défini
    this._liked = liked ?? false; // Initialisation du liked à false si non défini
  }

  private _id: string;
  private _type: string;
  private _dateCreation: Date;
  private _listeDeCommentaires: Commentaire[] = [];
  private _utilisateurs: Utilisateur[] = [];
  private _likes: number; // Ajout du nombre de likes
  private _liked: boolean; // Ajout du statut liked

  public get id(): string {
    return this._id;
  }

  public get type(): string {
    return this._type;
  }

  public get dateCreation(): Date {
    return this._dateCreation;
  }

  public get listeDeCommentaires(): Commentaire[] {
    return this._listeDeCommentaires;
  }

  public get utilisateurs(): Utilisateur[] {
    return this._utilisateurs;
  }

  public get likes(): number {
    return this._likes;
  }

  public set likes(value: number) {
    this._likes = value;
  }

  public get liked(): boolean {
    return this._liked;
  }

  public set liked(value: boolean) {
    this._liked = value;
  }

  public ajouterCommentaire(commentaire: Commentaire): void {
    this._listeDeCommentaires.push(commentaire);
  }

  public ajouterUtilisateur(utilisateur: Utilisateur): void {
    this._utilisateurs.push(utilisateur);
  }
}
