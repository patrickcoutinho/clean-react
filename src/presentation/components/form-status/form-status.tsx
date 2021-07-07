import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { isLoading, error } = useContext(Context);

  return (
    <div data-testid="error-wrapper" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {error.message && <span className={Styles.error}>{error.message}</span>}
    </div>
  );
};

export default FormStatus;
