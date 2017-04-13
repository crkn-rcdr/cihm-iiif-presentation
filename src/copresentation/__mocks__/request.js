const fs = require('fs');
const glob = require('glob');

const readFilePromise = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data));
    });
  });
};

module.exports.single = async (key) => {
  let v;
  try {
    let responseBody = await readFilePromise(`mockdb/${key}.json`);
    v = { statusCode: 200, data: responseBody };
  } catch (e) {
    v = { statusCode: e.code === 'ENOENT' ? 404 : 500, error: e };
  }
  return v;
};

module.exports.components = async (key) => {
  let v;
  try {
    let files = await new Promise((resolve, reject) => {
      glob(`mockdb/${key}.*.json`, (err, files) => { err ? reject(err) : resolve(files) });
    });

    if (files.length) {
      let docs = await Promise.all(files.map(file => { return readFilePromise(file); }));
      v = {
        statusCode: 200,
        data: docs.reduce((obj, current) => {
          obj[current.key] = current;
          return obj;
        }, {})
      };
    } else {
      v = { statusCode: 404, error: { error: 'not_found', reason: 'no rows' } };
    }
  } catch (e) {
    v = { statusCode: 500, error: e };
  }
  return v;
};
