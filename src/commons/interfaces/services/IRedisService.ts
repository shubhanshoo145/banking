export interface IRedisService {
  initializeClient(): Promise<void>;
  shutdownClient(): Promise<void>;
  getKey(key: string): Promise<string>;
  setKey(key: string, value: string, expires?: number): Promise<void>;
  expireKeyAt(key: string, unixTimestamp: number): Promise<void>;
  incrementKeyBy(key: string, value: number): Promise<number>;
}