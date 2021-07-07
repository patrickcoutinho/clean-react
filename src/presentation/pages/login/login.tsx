import React, { useState } from 'react';
import {
  Footer,
  LoginHeader,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: {
      message: '',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
    },
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <button disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
