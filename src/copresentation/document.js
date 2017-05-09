const request = require('./request');

module.exports = class COPresentationDocument {
  constructor(id) {
    this.id = id;
  }

  async _fetch() {
    let response = await request.single(this.id);
    this.statusCode = response.statusCode;
    if (response.data) { this.data = response.data; }
    if (response.error) { this.error = response.error; }
    return this;
  }

  static fetch(id) {
    return (new COPresentationDocument(id))._fetch();
  }
};
