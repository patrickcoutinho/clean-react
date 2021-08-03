import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { formHelper } from '@/presentation/test-helpers';
import { ValidationStub } from '@/presentation/mocks';
import faker from 'faker';
import SignUp from './signup';

type SubjectTypes = {
  subject: RenderResult
};

type SubjectParams = {
  validationErrror: string
};

const makeSubject = (params?: SubjectParams): SubjectTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationErrror;
  const subject = render(
    <SignUp
      validation={validationStub}
    />,
  );

  return { subject };
};

const validationError = faker.random.words();

describe('SignUp Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { subject } = makeSubject({ validationErrror: validationError });

    formHelper.testChildCount(subject, 'error-wrapper', 0);
    formHelper.testButtonIsDisabled(subject, 'submit', true);

    formHelper.testStatusForField(subject, 'name', validationError);
    formHelper.testStatusForField(subject, 'email', validationError);
    formHelper.testStatusForField(subject, 'password', validationError);
    formHelper.testStatusForField(subject, 'passwordConfirmation', validationError);
  });

  test('Should show name error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    formHelper.populateInput(subject, 'name');
    formHelper.testStatusForField(subject, 'name', validationError);
  });

  test('Should show email error if validation fails', () => {
    const { subject } = makeSubject({
      validationErrror: validationError,
    });

    formHelper.populateInput(subject, 'email');
    formHelper.testStatusForField(subject, 'email', validationError);
  });
});
