import { FieldValidationSpy } from '../mocks';
import { ValidationComposite } from './validation-composite';

type SubjectTypes = {
  subject: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
};

const makeSubject = (): SubjectTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];

  const subject = new ValidationComposite(fieldValidationSpy);

  return { subject, fieldValidationSpy };
};

describe('ValidationComposite', () => {
  test('Should return the first error found if any validation fails ', () => {
    const { subject, fieldValidationSpy } = makeSubject();

    fieldValidationSpy.map((spy, index) => {
      spy.error = new Error(`${index + 1} error message`);
    });

    const error = subject.validate('any_field', 'any_value');

    expect(error).toBe('1 error message');
  });
});
