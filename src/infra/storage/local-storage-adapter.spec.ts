import faker from 'faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call window.localStorage with correct values', async () => {
    const subject = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.random.words();

    await subject.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
