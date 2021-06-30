import { HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSubject = ():AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = ():HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Shouls call axios with correct URL and verb', async () => {
    const request = mockPostRequest();
    const subject = makeSubject();
    await subject.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
