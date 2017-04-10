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

module.exports.single = async (key) => {
  let options = { uri: key };

  let v, responseBody;
  try {
    responseBody = await copresentation(options);
    v = { statusCode: 200, data: responseBody };
  } catch(e) {
    v = { statusCode: e.statusCode || 500, error: e.error || {} };
  }
  return v;
};

module.exports.components = async (key) => {
  let options = {
    uri: '_all_docs',
    qs: {
      startkey: `"${key}."`,
      endkey: `"${key}.\u00FF"`,
      include_docs: true
    }
  };

  let v, responseBody;
  try {
    responseBody = await copresentation(options);
    if (responseBody.rows.length) {
      v = {
        statusCode: 200,
        data: responseBody.rows.reduce((obj, current) => {
          obj[current.key] = current.doc;
          return obj;
        }, {})
      };
    } else {
      v = { statusCode: 404, error: { error: 'not_found', reason: 'no rows' } };
    }
  } catch(e) {
    v = { statusCode: e.statusCode || 500, error: e.error || {} };
  }

  return v;
};
