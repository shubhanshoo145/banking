const assert = require('assert');
const autoIncrement = require('mongoose-auto-increment');

const CONSTANTS = rootRequire('constants');

let Schema = null;

function init() {
  const ObjectId = Schema.Types.ObjectId;
  const logs = new Schema({
    previous: {},
  });
  const CurrencySchema = new Schema({
    currency_code: { type: Number, required: true }, // Auto Generated starts from 501
    currency_label: { type: String, enum: CONSTANTS.CURRENCIES, required: true }, // USD
    currency_name: { type: String, required: true }, // US Dollar
    currency_country: { type: String, enum: CONSTANTS.COUNTRIES, required: true }, // US
    is_active: { type: Boolean, required: true, default: true },
    created_by: { type: ObjectId, ref: 'user', required: true },
    updated_by: { type: ObjectId, ref: 'user', required: true },
    logs: [logs],
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

  CurrencySchema.plugin(autoIncrement.plugin, {
    model: 'currency',
    field: 'currency_code',
    startAt: 520,
    incrementBy: 1,
  });

  return CurrencySchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};