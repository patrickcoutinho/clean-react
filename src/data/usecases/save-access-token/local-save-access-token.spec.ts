import { SetStorageMock } from '@/data/mocks';
import faker from 'faker';
import { LocalSaveAccessToken } from './local-save-access-token';

type SubjectTypes = {
  subject: LocalSaveAccessToken
  setStorageMock: SetStorageMock
};

const makeSubject = (): SubjectTypes => {
  const setStorageMock = new SetStorageMock();
  const subject = new LocalSaveAccessToken(setStorageMock);

  return { subject, setStorageMock };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const accessToken = faker.datatype.uuid();
    const { subject, setStorageMock } = makeSubject();

    await subject.save(accessToken);

    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('Should throw if SetStorage throws', async () => {
    const { subject, setStorageMock } = makeSubject();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());

    const promise = subject.save(faker.datatype.uuid());

    expect(promise).rejects.toThrowError();
  });
});
