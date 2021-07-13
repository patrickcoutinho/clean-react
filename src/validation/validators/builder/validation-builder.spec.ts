import faker from 'faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { ValidationBuilder as subject } from './validation-builder';

const fieldName = faker.database.column();
const length = faker.datatype.number();

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
    const validations = subject.field(fieldName).minLength(length).build();

    expect(validations).toStrictEqual([new MinLengthValidation(fieldName, length)]);
  });

  test('Should return a list of validations', () => {
    const validations = subject.field(fieldName).required().minLength(length).email()
      .build();

    expect(validations).toStrictEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, length),
      new EmailValidation(fieldName),
    ]);
  });
});
