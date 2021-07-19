import faker from 'faker';
import { AddAccountParams } from '../usecases';

const fakePassword = faker.internet.password();

export const addAccountMockParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword,
  passwordConfirmation: fakePassword,
});
