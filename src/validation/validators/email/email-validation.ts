import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly name: string) {}

  validate(value: string): Error {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(value) ? null : new InvalidFieldError();
  }
}
