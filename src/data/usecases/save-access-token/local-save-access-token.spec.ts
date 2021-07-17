import { SetSorageSpy } from '@/data/mocks';
import faker from 'faker';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with corret value', async () => {
    const setStorageSpy = new SetSorageSpy();
    const subject = new LocalSaveAccessToken(setStorageSpy);
    const accessToken = faker.datatype.uuid();

    await subject.save(accessToken);

    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
