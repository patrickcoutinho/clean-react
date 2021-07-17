import { SetStorage } from '@/data/protocols/storage/set-storage';
import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter();
