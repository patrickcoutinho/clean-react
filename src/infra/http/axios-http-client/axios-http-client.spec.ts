import { axiosMock } from '@/infra/mocks';
import axios from 'axios';
import { postRequestMock } from '@/data/mocks';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SubjectTypes = {
  subject: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSubject = (): SubjectTypes => {
  const subject = new AxiosHttpClient();
  const mockedAxios = axiosMock();

  return {
    subject,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should calls axios with correct values', async () => {
    const request = postRequestMock();
    const { subject, mockedAxios } = makeSubject();

    await subject.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should calls axios and returns correct statusCode and body', async () => {
    const { subject, mockedAxios } = makeSubject();
    const promise = subject.post(postRequestMock());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
