import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { mockAuthentication } from '@/domain/mocks/mock-authentication';
import faker from 'faker';
import HttpPostClientSpy from '@/data/mocks/http-client-mock';
import RemoteAuthentication from './remote-authentication';

type SutTypes = {
  sut:RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe('RemoteAuthetication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'other_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toBe(authenticationParams);
  });

  test('Should throw InvalidCredentialsErrorif HttpPostClient resturns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
