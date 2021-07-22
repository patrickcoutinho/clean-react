import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { formHelper } from '@/presentation/test-helpers';
import SignUp from './signup';

type SubjectTypes = {
  subject: RenderResult
};

const makeSubject = (): SubjectTypes => {
  const subject = render(
    <SignUp />,
  );

  return { subject };
};

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { subject } = makeSubject();

    formHelper.testChildCount(subject, 'error-wrapper', 0);
    formHelper.testButtonIsDisabled(subject, 'submit', true);

    formHelper.testStatusForField(subject, 'name', validationError);
    formHelper.testStatusForField(subject, 'email', validationError);
    formHelper.testStatusForField(subject, 'password', validationError);
    formHelper.testStatusForField(subject, 'passwordConfirmation', validationError);
  });
});
