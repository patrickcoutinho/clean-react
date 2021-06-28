import faker from 'faker';
import { AccountModel } from '../models';
import { AuthenticationParams } from '../usecases';

export const authenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const accountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
