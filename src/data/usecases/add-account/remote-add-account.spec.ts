import { HttpPostClientSpy } from '@/data/mocks';
import { HttpStatusCode } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { addAccountParamsMock } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { AddAccountParams } from '@/domain/usecases';
import faker from 'faker';
import { RemoteAddAccount } from './remote-add-account';

type SubjectTypes = {
  subject: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
};

const makeSubject = (url: string = faker.internet.url()): SubjectTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();
  const subject = new RemoteAddAccount(url, httpPostClientSpy);

  return { subject, httpPostClientSpy };
};

const fakeUrl = faker.internet.url();

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const { subject, httpPostClientSpy } = makeSubject(fakeUrl);
    await subject.add(addAccountParamsMock());

    expect(httpPostClientSpy.url).toBe(fakeUrl);
  });

  test('Should call HttpPostClient with correct body ', async () => {
    const { subject, httpPostClientSpy } = makeSubject(fakeUrl);
    const addAccountParams = addAccountParamsMock();
    await subject.add(addAccountParams);

    expect(httpPostClientSpy.body).toBe(addAccountParams);
  });

  test('Should trrows EmailInUseError if HttpPostClient returns 403', async () => {
    const { subject, httpPostClientSpy } = makeSubject(fakeUrl);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = subject.add(addAccountParamsMock());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should trrows UnexpectedErrror if HttpPostClient returns 400', async () => {
    const { subject, httpPostClientSpy } = makeSubject(fakeUrl);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = subject.add(addAccountParamsMock());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
