const assert = require('assert');
let Schema = null;

function init() {
  const logs = new Schema({
    previous: {},
  });
  const ReutersRateSchema = new Schema({
    rates: {},
    logs: [logs],
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
  return ReutersRateSchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};