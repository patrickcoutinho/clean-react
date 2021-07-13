import faker from 'faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
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

  test('Should return MinLengthValidation', () => {
    const validations = subject.field(fieldName).minLength(6).build();

    expect(validations).toStrictEqual([new MinLengthValidation(fieldName, 6)]);
  });

  test('Should return a list of validations', () => {
    const validations = subject.field(fieldName).required().minLength(6).email()
      .build();

    expect(validations).toStrictEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, 6),
      new EmailValidation(fieldName),
    ]);
  });
});
