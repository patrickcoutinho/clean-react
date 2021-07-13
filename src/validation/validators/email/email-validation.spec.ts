import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';
import { EmailValidation } from './email-validation';

const makeSubject = (): EmailValidation => new EmailValidation(faker.database.column());

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const subject = makeSubject();
    const error = subject.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if email is valid', () => {
    const subject = makeSubject();
    const error = subject.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });

  test('Should return falsy if email is empty', () => {
    const subject = makeSubject();
    const error = subject.validate('');

    expect(error).toBeFalsy();
  });
});
