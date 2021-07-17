import { SetSorageSpy } from '@/data/mocks';
import faker from 'faker';
import { LocalSaveAccessToken } from './local-save-access-token';

type SubjectTypes = {
  subject: LocalSaveAccessToken
  setStorageSpy: SetSorageSpy
};

const makeSubject = (): SubjectTypes => {
  const setStorageSpy = new SetSorageSpy();
  const subject = new LocalSaveAccessToken(setStorageSpy);

  return { subject, setStorageSpy };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with corret value', async () => {
    const accessToken = faker.datatype.uuid();
    const { subject, setStorageSpy } = makeSubject();

    await subject.save(accessToken);

    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
