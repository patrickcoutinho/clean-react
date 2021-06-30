import { HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSubject = ():AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = ():HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Should calls axios with correct values', async () => {
    const request = mockPostRequest();
    const subject = makeSubject();
    await subject.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should calls axios and returns correct statusCode and body', async () => {
    const subject = makeSubject();
    const httpResponse = await subject.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
