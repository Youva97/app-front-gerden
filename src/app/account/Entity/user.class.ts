import { v4 as uuid } from 'uuid';
import { InvalidUsernameException } from '../Exceptions/invalid-username.exception';

export enum Activity {
  Aucun = 'aucun',
  Chomage = 'chomage',
  Conges = 'CongesTravail',
  SansActif = 'sansactif',
  CDD = 'CDD',
  CDI = 'CDI',
  Interimaire = 'Interimaire',
}

export class Address {
  constructor(
    streetNumber?: string,
    streetName?: string,
    otherAddress?: string,
    postalCode?: string,
    city?: string,
    country?: string
  ) {
    if (streetNumber) this._streetNumber = streetNumber;
    if (streetName) this._streetName = streetName;
    if (otherAddress) this._otherAddress = otherAddress;
    if (postalCode) this._postalCode = postalCode;
    if (city) this._city = city;
    if (country) this._country = country;
  }

  private _streetNumber: string;
  private _streetName: string;
  private _otherAddress: string;
  private _postalCode: string;
  private _city: string;
  private _country: string;

  public get streetNumber() {
    return this._streetNumber;
  }
  public get streetName() {
    return this._streetName;
  }
  public get otherAddress() {
    return this._otherAddress;
  }
  public get postalCode() {
    return this._postalCode;
  }
  public get city() {
    return this._city;
  }
  public get country() {
    return this._country;
  }
}

export default class User {
  private isNewUser(id?: string | null): string {
    if (!id) return uuid();
    return id;
  }

  constructor(
    id?: string | null,
    name?: string,
    surname?: string,
    phoneNumber?: string,
    email?: string,
    address?: Address,
    activity?: Activity
  ) {
    this._id = this.isNewUser(id);
    if (!name || !surname) throw new InvalidUsernameException(name, surname);
    this._name = name;
    this._surname = surname;
    if (phoneNumber) this._phoneNumber = phoneNumber;
    if (email) this._email = email;
    if (address) this._address = address;
    if (activity) this._activity = activity;
  }
  private _id: string;
  private _name: string;
  private _surname: string;
  private _phoneNumber: string;
  private _email: string;
  private _address: Address;
  private _activity: Activity;

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get surname() {
    return this._surname;
  }
  public get phoneNumber() {
    return this._phoneNumber;
  }
  public get email() {
    return this._email;
  }
  public get address() {
    return this._address;
  }
  public get activity() {
    return this._activity;
  }
}

export type UserDTO = {
  username: string;
  password: string;
};
