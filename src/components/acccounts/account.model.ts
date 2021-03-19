import { Schema, model } from 'mongoose';

import { IAccountDocument } from './account.interface';

const accountSchema = new Schema({
  account_number: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  pin: { type: String, required: true, },
  card_number: { type: String, required: true },
});

export default model<IAccountDocument>('accounts', accountSchema);
