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

const history = createMemoryHistory({ initialEntries: ['/login'] });

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

const simulateValidSubmit = async (subject: RenderResult): Promise<SimulateValidSubmitTypes> => {
  const email = populateEmailInput(subject);
  const password = populatePasswordInput(subject);

  const form = subject.getByTestId('form');
  fireEvent.submit(form);

  await waitFor(() => form);

  return { email, password };
};

const testStatusForField = (
  subject: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = subject.getByTestId(`${fieldName}-status`);

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testErrorWrapperChildCount = (subject: RenderResult, count: number): void => {
  const errorWrapper = subject.getByTestId('error-wrapper');
  expect(errorWrapper.childElementCount).toBe(count);
};

const testElementExists = (subject: RenderResult, elementTestId: string): void => {
  const element = subject.getByTestId(elementTestId);
  expect(element).toBeTruthy();
};

const testElementText = (
  subject: RenderResult,
  elementTestId: string,
  text: string,
): void => {
  const element = subject.getByTestId(elementTestId);
  expect(element.textContent).toBe(text);
};

const testButtonIsDisabled = (
  subject: RenderResult,
  elementTestId: string,
  isDisabled: boolean,
): void => {
  const submitButtom = subject.getByTestId(elementTestId) as HTMLButtonElement;
  expect(submitButtom.disabled).toBe(isDisabled);
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

    testErrorWrapperChildCount(subject, 0);
    testButtonIsDisabled(subject, 'login-button', true);
    testStatusForField(subject, 'email', validationError);
    testStatusForField(subject, 'password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    populateEmailInput(subject);
    testStatusForField(subject, 'email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    populatePasswordInput(subject);
    testStatusForField(subject, 'password', validationError);
  });

  test('Should show valid email if validation succeeds', () => {
    const { subject } = makeSubject();

    populateEmailInput(subject);
    testStatusForField(subject, 'email');
  });

  test('Should show valid password if validation succeeds', () => {
    const { subject } = makeSubject();

    populatePasswordInput(subject);
    testStatusForField(subject, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { subject } = makeSubject();

    populateEmailInput(subject);
    populatePasswordInput(subject);

    testButtonIsDisabled(subject, 'login-button', false);
  });

  test('Should show spinnner on submit', async () => {
    const { subject } = makeSubject();
    await simulateValidSubmit(subject);

    testElementExists(subject, 'spinner');
  });

  test('Should call Authentication with correct values', async () => {
    const { subject, authenticationSpy } = makeSubject();
    const { email, password } = await simulateValidSubmit(subject);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { subject, authenticationSpy } = makeSubject();

    await simulateValidSubmit(subject);
    await simulateValidSubmit(subject);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const { subject, authenticationSpy } = makeSubject({
      validationErrror: validationError,
    });

    await simulateValidSubmit(subject);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error is Authentication fails', async () => {
    const { subject, authenticationSpy } = makeSubject();

    const error = new InvalidCredentialsError();

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(
      Promise.reject(error),
    );

    await simulateValidSubmit(subject);

    testElementText(subject, 'error-message', error.message);
    testErrorWrapperChildCount(subject, 1);
  });

  test('Should add accessToken to localstorage on authentication success', async () => {
    const { subject, authenticationSpy } = makeSubject();

    await simulateValidSubmit(subject);

    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signup page', async () => {
    const { subject } = makeSubject();
    const signup = subject.getByText(/Criar conta/);

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
