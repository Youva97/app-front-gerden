import User from '../Entity/user.class';

enum TypeDeRole {
  VISITEUR = 'VISITEUR',
  PROFESSIONNEL = 'PROFESSIONNEL',
  ADMINISTRATEUR = 'ADMINISTRATEUR',
}

type RoleDTO = {
  libelle: TypeDeRole;
};

type AdresseDTO = {
  numeroRue: string;
  nomRue: string;
  complementAdresse: string;
  codePostal: string;
  ville: string;
  pays: string;
};

type UserRegistrationDTO = {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  fonction: string;
  telephone: string;
  role: RoleDTO;
  adresse: AdresseDTO;
};

export class GerdenHttpApiMapper {
  mapToUserRegistrationDTO(user: User, password: string): UserRegistrationDTO {
    return {
      nom: user.name,
      prenom: user.surname,
      email: user.email,
      motDePasse: password,
      fonction: user.activity,
      telephone: user.phoneNumber,
      role: { libelle: TypeDeRole.VISITEUR },
      adresse: {
        numeroRue: user.address.streetNumber,
        nomRue: user.address.streetName,
        complementAdresse: user.address.otherAddress,
        codePostal: user.address.postalCode,
        ville: user.address.city,
        pays: user.address.country,
      },
    };
  }
}
