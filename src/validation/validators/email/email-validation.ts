import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly name: string) {}

  validate(value: string): Error | null {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(value) ? null : new InvalidFieldError();
  }
}
