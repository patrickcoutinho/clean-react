import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './login';

type SubjectTypes = {
  subject: RenderResult
};

const makeSubject = (): SubjectTypes => {
  const subject = render(<Login />);

  return {
    subject,
  };
};

describe('Login Page', () => {
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
});
