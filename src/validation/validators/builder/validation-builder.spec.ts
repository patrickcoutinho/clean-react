import faker from 'faker';
import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder as subject } from './validation-builder';

const fieldName = faker.database.column();

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = subject.field(fieldName).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });
});
