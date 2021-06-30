import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSubject = ():AxiosHttpClient => new AxiosHttpClient();

describe('AxiosHttpClient', () => {
  test('Shouls call axios with correct URL and verb', async () => {
    const url = faker.internet.url();
    const subject = makeSubject();
    await subject.post({ url });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
