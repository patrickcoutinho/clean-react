import React from 'react';
import Spinner from '@/presentation/components/spinner/spinner';
import Logo from '@/presentation/components/logo/logo';
import Styles from './login-styles.scss';

const Login: React.FC = () => (
  <div className={Styles.login}>
    <header className={Styles.header}>
      <Logo />
      <h1>Enquete para devs</h1>
    </header>
    <form className={Styles.form}>
      <h2>Login</h2>
      <div className={Styles.inputWrapper}>
        <input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
        <span className={Styles.status}>🔴</span>
      </div>
      <div className={Styles.inputWrapper}>
        <input type="password" name="password" id="password" placeholder="Digite sua senha" />
        <span className={Styles.status}>🔴</span>
      </div>

      <button className={Styles.submit} type="submit">Entrar</button>
      <span className={Styles.link}>Criar conta</span>
      <div className={Styles.errorWrapper}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Error</span>
      </div>
    </form>
    <footer className={Styles.footer} />
  </div>
);

export default Login;
