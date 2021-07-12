import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';
import { EmailValidation } from './email-validation';

const makeSubject = () => new EmailValidation(faker.random.word());

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
});
