import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const { state, setState } = useContext(Context);
  const { error } = state;

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => '🔴';

  const getError = (): string => error[name];

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} data-testid={name} onChange={handleChange} />
      <span
        data-testid={`${name}-status`}
        title={getError()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
