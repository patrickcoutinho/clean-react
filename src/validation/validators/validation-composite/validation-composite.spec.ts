import faker from 'faker';
import { FieldValidationSpy } from '@/validation/mocks/';
import { ValidationComposite } from './validation-composite';

type SubjectTypes = {
  subject: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
};

const makeSubject = (fieldName: string): SubjectTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const subject = ValidationComposite.build(fieldValidationSpy);

  return { subject, fieldValidationSpy };
};

const fieldName = faker.database.column();
const errorMessage = faker.random.words();

describe('ValidationComposite', () => {
  test('Should return the first error found if any validation fails', () => {
    const { subject, fieldValidationSpy } = makeSubject(fieldName);

    fieldValidationSpy.map((spy, index) => {
      spy.error = new Error(`${index + 1} ${errorMessage}`);
    });

    const error = subject.validate(fieldName, faker.random.word());

    expect(error).toBe(`1 ${errorMessage}`);
  });

  test('Should return falsy if not found any error', () => {
    const { subject } = makeSubject(fieldName);

    const error = subject.validate(fieldName, faker.random.word());

    expect(error).toBeFalsy();
  });
});
