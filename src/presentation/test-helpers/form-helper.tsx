import { RenderResult } from '@testing-library/react';

export const testChildCount = (
  subject: RenderResult,
  elementTestId: string,
  count: number,
): void => {
  const el = subject.getByTestId(elementTestId);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  subject: RenderResult,
  elementTestId: string,
  isDisabled: boolean,
): void => {
  const submitButtom = subject.getByTestId(elementTestId) as HTMLButtonElement;
  expect(submitButtom.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  subject: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = subject.getByTestId(`${fieldName}-status`);

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};
