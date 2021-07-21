import React, { useState } from 'react';
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './signup-styles.scss';

const SignUp: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: {
      message: '',
      name: 'Campo obrigatório',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
      passwordConfirmation: 'Campo obrigatório',
    },
  });

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
