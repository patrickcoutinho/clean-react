import React, { useEffect, useState } from 'react';
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import Styles from './signup-styles.scss';

type Props = {
  validation: Validation
};

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: {
      message: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  useEffect(() => {
    setState({
      ...state,
      error: {
        ...state.error,
        name: validation.validate('name', state.name),
        email: validation.validate('email', state.email),
        password: validation.validate('password', state.password),
        passwordConfirmation: validation.validate(
          'passwordConfirmation',
          state.passwordConfirmation,
        ),
      },
    });
  }, [state.name, state.email]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme a senha digitada"
          />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">
            Enviar
          </button>
          <span className={Styles.link}>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
