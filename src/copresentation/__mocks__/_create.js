// takes an _all_docs couch response and turns into a filesystem db

const fs = require('fs');

const rows = require('./db.json').rows;

(async (rows) => {
  let writes = rows.map((row) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(`db/${row.key}.json`, JSON.stringify(row.doc, null, 2), (err) => {
        err ? reject(err) : resolve();
      });
    });
  });

  return Promise.all(writes);
})(rows).then(() => { console.log('done'); });
