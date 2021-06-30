import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  test('Shouls call axios with correct URL', async () => {
    const url = faker.internet.url();
    const subject = new AxiosHttpClient();
    await subject.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
