import React from 'react';
import Spinner from '@/presentation/components/spinner/spinner';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Input from '@/presentation/components/input/input';
import Styles from './login-styles.scss';

const Login: React.FC = () => (
  <div className={Styles.login}>
    <Header />
    <form className={Styles.form}>
      <h2>Login</h2>
      <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
      <Input type="password" name="password" id="password" placeholder="Digite sua senha" />

      <button className={Styles.submit} type="submit">Entrar</button>
      <span className={Styles.link}>Criar conta</span>
      <div className={Styles.errorWrapper}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Error</span>
      </div>
    </form>
    <Footer />
  </div>
);

export default Login;
