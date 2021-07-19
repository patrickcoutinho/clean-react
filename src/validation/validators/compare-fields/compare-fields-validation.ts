import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly name: string,
    private readonly valueToCompare: string,
  ) {}

  validate(value: string): InvalidFieldError | null {
    return value !== this.valueToCompare ? new InvalidFieldError() : null;
  }
}
