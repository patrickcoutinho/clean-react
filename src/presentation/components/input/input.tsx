import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const { error } = useContext(Context);

  const getStatus = (): string => '🔴';

  const getError = (): string => error[name];

  return (
    <div className={Styles.inputWrapper}>
      <input
        {...props}
        autoComplete="new-password"
      />
      <span data-testid={`${name}-status`} title={getError()} className={Styles.status}>{getStatus()}</span>
    </div>
  );
};

export default Input;
