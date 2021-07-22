import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';
import {
  ValidationStub,
  AuthenticationSpy,
  SaveAccessTokenMock,
} from '@/presentation/mocks';
import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import { formHelper } from '@/presentation/test-helpers';

type SubjectTypes = {
  subject: RenderResult
  authenticationSpy: AuthenticationSpy,
  saveAccessTokenMock: SaveAccessTokenMock
};

type SubjectParams = {
  validationErrror: string
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSubject = (params?: SubjectParams): SubjectTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationErrror;

  const subject = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
      ,
    </Router>,
  );

  return { subject, authenticationSpy, saveAccessTokenMock };
};

type SimulateValidSubmitTypes = {
  email: string
  password: string
};

const simulateValidSubmit = async (subject: RenderResult): Promise<SimulateValidSubmitTypes> => {
  const email = formHelper.populateInput(subject, 'email');
  const password = formHelper.populateInput(subject, 'password');

  const form = subject.getByTestId('form');
  fireEvent.submit(form);

  await waitFor(() => form);

  return { email, password };
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

const validationError = faker.random.words();

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    formHelper.testChildCount(subject, 'error-wrapper', 0);
    formHelper.testButtonIsDisabled(subject, 'login-button', true);
    formHelper.testStatusForField(subject, 'email', validationError);
    formHelper.testStatusForField(subject, 'password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    formHelper.populateInput(subject, 'email');
    formHelper.testStatusForField(subject, 'email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    formHelper.populateInput(subject, 'password');
    formHelper.testStatusForField(subject, 'password', validationError);
  });

  test('Should show valid email if validation succeeds', () => {
    const { subject } = makeSubject();

    formHelper.populateInput(subject, 'email');
    formHelper.testStatusForField(subject, 'email');
  });

  test('Should show valid password if validation succeeds', () => {
    const { subject } = makeSubject();

    formHelper.populateInput(subject, 'password');
    formHelper.testStatusForField(subject, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { subject } = makeSubject();

    formHelper.populateInput(subject, 'email');
    formHelper.populateInput(subject, 'password');

    formHelper.testButtonIsDisabled(subject, 'login-button', false);
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
    formHelper.testChildCount(subject, 'error-wrapper', 1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { subject, authenticationSpy, saveAccessTokenMock } = makeSubject();

    await simulateValidSubmit(subject);

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should present error is SaveAccessToken fails', async () => {
    const { subject, saveAccessTokenMock } = makeSubject();

    const error = new Error(faker.random.words());

    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(
      Promise.reject(error),
    );

    await simulateValidSubmit(subject);

    testElementText(subject, 'error-message', error.message);
    formHelper.testChildCount(subject, 'error-wrapper', 1);
  });

  test('Should go to signup page', async () => {
    const { subject } = makeSubject();
    const signup = subject.getByText(/Criar conta/);

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
