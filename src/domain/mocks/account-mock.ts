import faker from 'faker';
import { AccountModel } from '../models';
import { AuthenticationParams } from '../usecases';

export const authenticationMockParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const accountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
