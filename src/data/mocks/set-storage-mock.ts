import { SetStorage } from '@/data/protocols/storage/set-storage';

export class SetSorageSpy implements SetStorage {
  key: string;

  value: any;

  async set(key: string, value:any): Promise<void> {
    this.key = key;
    this.value = value;
  }
}
