import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const { getByTestId, getByText } = render(<Login />);

    const errorWrapper = getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButtom = getByText(/Entrar/) as HTMLButtonElement;
    expect(submitButtom.disabled).toBe(true);

    const emailStatus = getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');

    const passwordlStatus = getByTestId('password-status');
    expect(passwordlStatus.title).toBe('Campo obrigatório');
  });
});
