import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeBody } from '../middleware/sanitize.js';

test('strips $-operators and dotted keys from body', () => {
  const req = { body: { email: { $gt: '' }, 'a.b': 1, ok: 'x', nested: { $ne: 1, keep: 2 } } };
  sanitizeBody(req, {}, () => {});
  assert.deepEqual(req.body, { email: {}, ok: 'x', nested: { keep: 2 } });
});
