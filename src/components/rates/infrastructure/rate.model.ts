import { Schema, model } from 'mongoose';
import { IRateDocument } from '../rate.interfaces';

const rateSchema = new Schema({
  rates: [{
    source_currency: {
      type: String,
      required: true,
    },
    destination_currency: {
      type: String,
      required: true,
    },
    fx_rate: {
      type: Number,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    scaling_factor: {
      type: Number,
      required: true,
    },
  }]
}, { 
  timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' }, 
  strict: 'throw' 
});

export default model<IRateDocument>('reutersrates', rateSchema);
