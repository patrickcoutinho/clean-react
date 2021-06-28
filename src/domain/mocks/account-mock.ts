import faker from 'faker';
import { AccountModel } from '../models/account-model';
import { AuthenticationParams } from '../usecases/authentication';

export const authenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const accountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
