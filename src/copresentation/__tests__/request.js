jest.unmock('../request');
jest.unmock('request'); // This is apparently required

const copRequest = require('../request');

it('fetches an extant copresentation doc', async () => {
  let response = await copRequest('oocihm.8_04178_69');
  expect(response.data.label).toBe('[Vol. 6, no. 9 (Sept. 1881)]');
});

it('returns a 404 when a document does not exist', async () => {
  let response = await copRequest('foo');
  expect(response.statusCode).toBe(404);
});
