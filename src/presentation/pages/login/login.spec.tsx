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

type SimulateValidSubmitTypes = {
  email: string
  password: string
};

const populateEmailInput = (subject: RenderResult): string => {
  const email = faker.internet.email();
  const emailInput = subject.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });

  return email;
};

const populatePasswordInput = (subject: RenderResult): string => {
  const password = faker.internet.password();
  const passwordInput = subject.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });

  return password;
};

const simulateValidSubmit = (subject: RenderResult): SimulateValidSubmitTypes => {
  const email = populateEmailInput(subject);
  const password = populatePasswordInput(subject);

  const submitButton = subject.getByText(/Entrar/);
  fireEvent.click(submitButton);

  return { email, password };
};

const simulateStatusForField = (
  subject: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = subject.getByTestId(`${fieldName}-status`);

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
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

    simulateStatusForField(subject, 'email', validationError);
    simulateStatusForField(subject, 'password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    populateEmailInput(subject);
    simulateStatusForField(subject, 'email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    populatePasswordInput(subject);
    simulateStatusForField(subject, 'password', validationError);
  });

  test('Should show valid email if validation succeeds', () => {
    const { subject } = makeSubject();

    populateEmailInput(subject);
    simulateStatusForField(subject, 'email');
  });

  test('Should show valid password if validation succeeds', () => {
    const { subject } = makeSubject();

    populatePasswordInput(subject);
    simulateStatusForField(subject, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { subject } = makeSubject();

    populateEmailInput(subject);
    populatePasswordInput(subject);

    const submitButton = subject.getByText(/Entrar/) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinnner on submit', () => {
    const { subject } = makeSubject();
    simulateValidSubmit(subject);
    const spinner = subject.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { subject, authenticationSpy } = makeSubject();
    const { email, password } = simulateValidSubmit(subject);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', () => {
    const { subject, authenticationSpy } = makeSubject();

    simulateValidSubmit(subject);
    simulateValidSubmit(subject);

    expect(authenticationSpy.callsCount).toBe(1);
  });
});
