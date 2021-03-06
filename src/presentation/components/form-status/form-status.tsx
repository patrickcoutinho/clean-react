import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { error, isLoading } = state;

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {error.message && (
      <span
        data-testid="error-message"
        className={Styles.error}
      >
        {error.message}
      </span>
      )}
    </div>
  );
};

export default FormStatus;
