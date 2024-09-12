export class InvalidUsernameException extends Error {
    constructor(name: string | undefined, surname: string | undefined) {
      super(`Couldn't instanciate user with name ${name} and surname ${surname}`);
    }
  
}