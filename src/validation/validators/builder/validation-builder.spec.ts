import faker from 'faker';
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators';
import { ValidationBuilder as subject } from './validation-builder';

const fieldName = faker.database.column();

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = subject.field(fieldName).required().build();

    expect(validations).toStrictEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should return EmailValidation', () => {
    const validations = subject.field(fieldName).email().build();

    expect(validations).toStrictEqual([new EmailValidation(fieldName)]);
  });
});
