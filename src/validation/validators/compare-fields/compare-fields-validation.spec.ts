import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSubject = (valueToCompare: string):
CompareFieldsValidation => new CompareFieldsValidation(
  faker.database.column(), valueToCompare,
);

describe('CompareFieldsValidation', () => {
  test('Should returns InvalidFieldError if compare is invalid', () => {
    const subject = makeSubject(faker.random.word());
    const error = subject.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should returns falsy if compare is valid', () => {
    const valueToCampare = faker.random.word();
    const subject = makeSubject(valueToCampare);
    const error = subject.validate(valueToCampare);

    expect(error).toBeFalsy();
  });
});