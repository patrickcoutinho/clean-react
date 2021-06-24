import { HttpPostClientSpy } from '../../mocks/http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthetication', () => {
  test('Should call HttpPostClient with correct URL', () => {
    const url = 'any';
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    sut.auth();

    expect(httpPostClient.url).toBe(url);
  });
});
