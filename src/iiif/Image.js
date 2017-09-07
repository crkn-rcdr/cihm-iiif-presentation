const env = require('require-env');
const imageEndpoint = env.requireUrl('IIIFI_ENDPOINT').href;

const qs = require('querystring');
const Entity = require('./Entity');

module.exports = class Image extends Entity {
  constructor(argument, options) {
    super(argument, options);

    let i = this.id.lastIndexOf('.');
    this.itemId = this.id.slice(0, i);
    this.componentId = this.id.slice(i + 1);
  }

  static fetch(id) {
    return (new Image(id))._fetchFromType('component');
  }

  representation(options) {
    if (!this.doc) { return {}; };

    let data = this.doc;
    let retval = super.representation();
    retval['@id'] = [this.endpoint, this.itemId, 'annotation', this.componentId].join('/')
    retval['@type'] = 'oa:Annotation';
    retval.motivation = 'sc:painting';
    retval.resource = {
      '@id': [imageEndpoint, qs.escape(data.canonicalMaster), 'full', 'full', '0', 'default.jpg'].join('/'),
      '@type': 'dctypes:Image',
      service: {
        "@context": "http://iiif.io/api/image/2/context.json",
        "@id": [imageEndpoint, qs.escape(data.canonicalMaster)].join('/'),
        "profile": "http://iiif.io/api/image/2/profiles/level2.json"
      }
    };
    if (data.canonicalMasterHeight) retval.resource.height = `${data.canonicalMasterHeight}px`;
    if (data.canonicalMasterWidth) retval.resource.width = `${data.canonicalMasterWidth}px`;
    retval.on = [this.endpoint, this.itemId, 'canvas', this.componentId].join('/');

    return retval;
  }
}
