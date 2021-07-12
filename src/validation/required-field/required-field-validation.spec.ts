import faker from 'faker';
import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSubject = ():
RequiredFieldValidation => new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const subject = makeSubject();
    const error = subject.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const subject = makeSubject();
    const error = subject.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});
