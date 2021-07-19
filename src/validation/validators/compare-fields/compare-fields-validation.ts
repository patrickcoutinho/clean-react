import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly name: string,
    private readonly valueToCompare: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string): InvalidFieldError | null {
    return new InvalidFieldError();
  }
}
