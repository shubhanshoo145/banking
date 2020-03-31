export interface ISerializedRate {
  source_currency: string;
  destination_currency: string;
  fx_rate: number;
  expires_at: Date;
  scaling_factor: number;
}