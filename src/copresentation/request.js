const env = require('require-env');
const endpoint = env.requireUrl('COPRESENTATION_ENDPOINT');
const rp = require('request-promise-native');

const copresentation = rp.defaults({
  baseUrl: endpoint.href,
  headers: { Accept: 'application/json' },
  json: true,
  timeout: 2000,
  method: 'GET'
});

module.exports = async function request(path) {
  let options = { uri: path };

  let v, responseBody;
  try {
    responseBody = await copresentation(options);
    v = { statusCode: 200, data: responseBody };
  } catch(e) {
    v = { statusCode: e.statusCode, error: e.error };
  }
  return v;
};
