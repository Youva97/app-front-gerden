export class AlreadyExistUsernameException extends Error {
    constructor(username: string) {
      super(`Couldn't create user with username because it already exists: ${username}`);
    }
  
}