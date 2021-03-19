import { Schema, model } from 'mongoose';

import { ITransactionDocument } from './transaction.interface';

const ObjectId = Schema.Types.ObjectId;
const transactionSchema = new Schema({
  account_id: { type: ObjectId, ref: 'account' },
  type: { type: String, required: true, enum: ['CREDIT', 'DEBIT'] },
  amount: { type: Number, required: true },
  running_balance: { type: Number, required: true, default: 0 }
});

export default model<ITransactionDocument>('transactions', transactionSchema);
