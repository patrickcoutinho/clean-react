import { HttpPostClientSpy } from '@/data/mocks';
import { addAccountMockParams } from '@/domain/mocks';
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
    await subject.add(addAccountMockParams());

    expect(httpPostClientSpy.url).toBe(fakeUrl);
  });
});
