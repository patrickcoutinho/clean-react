import React, { memo } from 'react';
import Logo from '../logo/logo';
import Styles from './login-header-styles.scss';

const LoginHeader: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>Enquete para devs</h1>
  </header>
);

export default memo(LoginHeader);
