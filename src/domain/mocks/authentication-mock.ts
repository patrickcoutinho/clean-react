import faker from 'faker';
import { AuthenticationParams } from '../usecases/authentication';

export const authenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
