import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly name: string) {}

  validate(value: string): InvalidFieldError | null {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+$/;
    return !value || emailRegex.test(value) ? null : new InvalidFieldError();
  }
}
