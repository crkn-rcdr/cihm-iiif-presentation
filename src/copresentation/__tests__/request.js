jest.unmock('../request');
jest.unmock('request'); // This is apparently required

const copRequest = require('../request');

it('fetches an extant copresentation doc', async () => {
  let response = await copRequest.single('oocihm.8_04178_69');
  expect(response.data.label).toBe('[Vol. 6, no. 9 (Sept. 1881)]');
});

it('returns a 404 when a document does not exist', async () => {
  let response = await copRequest.single('foo');
  expect(response.statusCode).toBe(404);
});

it("fetches an item's components", async() => {
  let response = await copRequest.components('oocihm.8_04178_69');
  expect(response.data['oocihm.8_04178_69.3'].label).toBe('p. 2');
});

it('returns a 404 when fetching components for an item that does not exist', async () => {
  let response = await copRequest.components('foo');
  expect(response.statusCode).toBe(404);
});
