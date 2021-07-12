import React from 'react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';
import { ValidationStub, AuthenticationSpy } from '@/presentation/mocks';
import { InvalidCredentialsError } from '@/domain/errors';
import Login from './login';
import 'jest-localstorage-mock';

type SubjectTypes = {
  subject: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SubjectParams = {
  validationErrror: string
};

const history = createMemoryHistory();

const makeSubject = (params?: SubjectParams): SubjectTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationErrror;

  const subject = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
      ,
    </Router>,
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
  beforeEach(() => {
    localStorage.clear();
  });

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

  test('Should not call Authentication if form is invalid', () => {
    const { subject, authenticationSpy } = makeSubject({
      validationErrror: validationError,
    });

    populateEmailInput(subject);
    const form = subject.getByTestId('form');
    fireEvent.submit(form);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error is Authentication fails', async () => {
    const { subject, authenticationSpy } = makeSubject();

    const error = new InvalidCredentialsError();

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(
      Promise.reject(error),
    );

    simulateValidSubmit(subject);

    const errorWrapper = subject.getByTestId('error-wrapper');

    await waitFor(() => errorWrapper);

    const errorMessage = subject.getByTestId('error-message');

    expect(errorMessage.textContent).toBe(error.message);
    expect(errorWrapper.childElementCount).toBe(1);
  });

  test('Should add accessToken to localstorage on authentication success', async () => {
    const { subject, authenticationSpy } = makeSubject();

    simulateValidSubmit(subject);

    await waitFor(() => subject.getByTestId('form'));

    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
  });

  test('Should go to signup page', async () => {
    const { subject } = makeSubject();
    const signup = subject.getByText(/Criar conta/);

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
