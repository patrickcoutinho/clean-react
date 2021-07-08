import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';
import { ValidationStub } from '@/presentation/mocks';
import Login from './login';

type SubjectTypes = {
  subject: RenderResult
  validationStub: ValidationStub
};

const makeSubject = (): SubjectTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();

  const subject = render(<Login validation={validationStub} />);

  return {
    subject,
    validationStub,
  };
};

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { subject, validationStub } = makeSubject();

    const errorWrapper = subject.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButtom = subject.getByText(/Entrar/) as HTMLButtonElement;
    expect(submitButtom.disabled).toBe(true);

    const emailStatus = subject.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);

    const passwordlStatus = subject.getByTestId('password-status');
    expect(passwordlStatus.title).toBe(validationStub.errorMessage);
  });

  test('Should show email error if validation fails', () => {
    const { subject, validationStub } = makeSubject();
    const emailInput = subject.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = subject.getByTestId('email-status');

    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const { subject, validationStub } = makeSubject();
    const passwordInput = subject.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = subject.getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email if validation succeeds', () => {
    const { subject, validationStub } = makeSubject();
    validationStub.errorMessage = null;

    const emailInput = subject.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = subject.getByTestId('email-status');

    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password if validation succeeds', () => {
    const { subject, validationStub } = makeSubject();
    validationStub.errorMessage = null;

    const passwordInput = subject.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = subject.getByTestId('password-status');

    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });
});
