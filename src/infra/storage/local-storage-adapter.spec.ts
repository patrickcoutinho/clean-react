import faker from 'faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSubject = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call window.localStorage with correct values', async () => {
    const subject = makeSubject();
    const key = faker.database.column();
    const value = faker.random.words();

    await subject.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
