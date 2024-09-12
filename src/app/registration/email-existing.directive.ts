import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import GerdenHttpApi from '../account/Service/gerden-http-api.implementation';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private gerdenHttpApi: GerdenHttpApi) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    try {
      return (await this.gerdenHttpApi.emailExist(control.value.toLowerCase()))
        ? null
        : { uniqueEmail: true };
    } catch (e: any) {
      return e?.error?.code === 409
        ? { uniqueEmail: true }
        : { uniqueCheckError: true };
    }
  }
}
