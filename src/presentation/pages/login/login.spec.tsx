import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';
import { ValidationStub, AuthenticationSpy } from '@/presentation/mocks';
import Login from './login';

type SubjectTypes = {
  subject: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SubjectParams = {
  validationErrror: string
};

const makeSubject = (params?: SubjectParams): SubjectTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationErrror;

  const subject = render(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );

  return { subject, authenticationSpy };
};

const validationError = faker.random.words();

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    const errorWrapper = subject.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButtom = subject.getByText(/Entrar/) as HTMLButtonElement;
    expect(submitButtom.disabled).toBe(true);

    const emailStatus = subject.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);

    const passwordlStatus = subject.getByTestId('password-status');
    expect(passwordlStatus.title).toBe(validationError);
  });

  test('Should show email error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });
    const emailInput = subject.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = subject.getByTestId('email-status');

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });
    const passwordInput = subject.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = subject.getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email if validation succeeds', () => {
    const { subject } = makeSubject();

    const emailInput = subject.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = subject.getByTestId('email-status');

    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password if validation succeeds', () => {
    const { subject } = makeSubject();

    const passwordInput = subject.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = subject.getByTestId('password-status');

    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const { subject } = makeSubject();

    const emailInput = subject.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = subject.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = subject.getByText(/Entrar/) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinnner on submit', () => {
    const { subject } = makeSubject();

    const emailInput = subject.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = subject.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = subject.getByText(/Entrar/);

    fireEvent.click(submitButton);

    const spinner = subject.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { subject, authenticationSpy } = makeSubject();

    const email = faker.internet.email();
    const emailInput = subject.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = subject.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = subject.getByText(/Entrar/);
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
