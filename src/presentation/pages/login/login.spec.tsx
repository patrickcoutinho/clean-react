import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';
import { Validation } from '@/presentation/protocols/validation';
import Login from './login';

class ValidationSpy implements Validation {
  errorMessage: string;

  field: string;

  value: string;

  validate(field: string, value: string): string {
    this.field = field;
    this.value = value;

    return this.errorMessage;
  }
}

type SubjectTypes = {
  subject: RenderResult
  validationSpy: ValidationSpy
};

const makeSubject = (): SubjectTypes => {
  const validationSpy = new ValidationSpy();
  const subject = render(<Login validation={validationSpy} />);

  return {
    subject,
    validationSpy,
  };
};

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { subject } = makeSubject();

    const errorWrapper = subject.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButtom = subject.getByText(/Entrar/) as HTMLButtonElement;
    expect(submitButtom.disabled).toBe(true);

    const emailStatus = subject.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');

    const passwordlStatus = subject.getByTestId('password-status');
    expect(passwordlStatus.title).toBe('Campo obrigatório');
  });

  test('Should call Validation with correct email', () => {
    const { subject, validationSpy } = makeSubject();
    const emailInput = subject.getByTestId('email');
    const email = faker.internet.email();

    fireEvent.input(emailInput, { target: { value: email } });

    expect(validationSpy.field).toBe('email');
    expect(validationSpy.value).toBe(email);
  });

  test('Should call Validation with correct password', () => {
    const { subject, validationSpy } = makeSubject();
    const passwordInput = subject.getByTestId('password');
    const password = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: password } });

    expect(validationSpy.field).toBe('password');
    expect(validationSpy.value).toBe(password);
  });
});
