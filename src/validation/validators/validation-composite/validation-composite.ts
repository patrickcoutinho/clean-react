import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(field: string, value: string): string | null {
    const validators = this.validators.filter((v) => v.name === field);
    for (const validator of validators) {
      const error = validator.validate(value);

      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
