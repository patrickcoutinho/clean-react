import React from 'react';
import { render, RenderResult } from '@testing-library/react';
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

const testChildCount = (
  subject: RenderResult,
  elementTestId: string,
  count: number,
): void => {
  const el = subject.getByTestId(elementTestId);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  subject: RenderResult,
  elementTestId: string,
  isDisabled: boolean,
): void => {
  const submitButtom = subject.getByTestId(elementTestId) as HTMLButtonElement;
  expect(submitButtom.disabled).toBe(isDisabled);
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

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { subject } = makeSubject();

    testChildCount(subject, 'error-wrapper', 0);
    testButtonIsDisabled(subject, 'submit', true);

    testStatusForField(subject, 'name', validationError);
    testStatusForField(subject, 'email', validationError);
    testStatusForField(subject, 'password', validationError);
    testStatusForField(subject, 'passwordConfirmation', validationError);
  });
});
