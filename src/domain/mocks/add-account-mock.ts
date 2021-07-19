import faker from 'faker';
import { AddAccountParams } from '../usecases';

const fakePassword = faker.internet.password();

export const addAccountParamsMock = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: fakePassword,
  passwordConfirmation: fakePassword,
});
