import faker from 'faker';
import { HttpPostParams } from '../protocols/http';

export const postRequestMock = ():HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
