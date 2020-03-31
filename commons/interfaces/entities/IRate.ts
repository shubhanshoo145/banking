import { ISerializedRate } from './ISerializedRate';

export interface IRate {
  expiresAt: Date;
  serialize(): ISerializedRate;
}