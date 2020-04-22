import { Schema, model } from 'mongoose';

import { ICurrencyDocument } from '../currency.interfaces';

const currencySchema = new Schema({
  currency_label: {
    type: String,
    required: true,
  },
  currency_name: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  }
}, { strict: 'throw' });

export default model<ICurrencyDocument>('currencies', currencySchema);
