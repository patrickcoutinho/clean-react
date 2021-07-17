import React, { useEffect, useState } from 'react';
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Link, useHistory } from 'react-router-dom';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    error: {
      message: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setState({
      ...state,
      error: {
        ...state.error,
        email: validation.validate('email', state.email),
        password: validation.validate('password', state.password),
      },
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.error.email || state.error.password) {
        return;
      }

      setState({ ...state, isLoading: true });

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: {
          ...error,
          message: error.message,
        },
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />
          <button
            disabled={!!state.error.email || !!state.error.password}
            className={Styles.submit}
            type="submit"
            data-testid="login-button"
          >
            Entrar
          </button>
          <Link to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
