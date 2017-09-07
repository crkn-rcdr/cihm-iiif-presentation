const env = require('require-env');
const endpoint = env.requireUrl('SELF_ENDPOINT').href;

const COPresentationDocument = require('../copresentation/document');

const copTypes = {
  collection: 'series',
  item: 'document',
  component: 'page'
};

module.exports = class Entity {
  constructor(argument, options) {
    if (typeof argument === 'string') {
      this.id = argument;
    } else {
      this.doc = argument;
      this.id = this.doc._id;
    }
    this.endpoint = endpoint;
    this.options = options || {};
  }

  async _fetch() {
    let doc = await COPresentationDocument.fetch(this.id);
    if (doc.error) {
      this.status = doc.statusCode;
      this.error = doc.error.reason;
    } else {
      this.doc = doc.data;
    }

    return this;
  }

  async _fetchFromType(type) {
    await this._fetch();
    if (!this.hasType(type)) {
      this.status = 404;
      this.error = `${this.id} is not a COPresentation ${type}`;
    }

    return this;
  }

  hasType(type) {
    return !!this.doc && this.doc.type === copTypes[type];
  }

  representation() {
    if (this.options.noContext) {
      return {};
    } else {
      return { '@context': 'http://iiif.io/api/presentation/2/context.json' };
    }
  }

  errorContext() {
    return {
      status: this.status,
      body: {
        status: this.status,
        error: this.error
      }
    };
  }
}
