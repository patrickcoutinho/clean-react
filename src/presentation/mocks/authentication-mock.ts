import { accountModelMock } from '@/domain/mocks';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account: AccountModel = accountModelMock();

  params: AuthenticationParams;

  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;

    return Promise.resolve(this.account);
  }
}
