const Entity = require('./Entity');
const Image = require('./Image');

module.exports = class Canvas extends Entity {
  constructor(argument, options) {
    super(argument, options);

    let i = this.id.lastIndexOf('.');
    this.itemId = this.id.slice(0, i);
    this.componentId = this.id.slice(i + 1);
  }

  static fetch(id) {
    return (new Canvas(id))._fetchFromComponent();
  }

  representation(options) {
    if (!this.doc) { return {}; };

    let data = this.doc;
    let retval = super.representation();
    retval['@id'] = [this.endpoint, this.itemId, 'canvas', this.componentId].join('/');
    retval['@type'] = 'sc:Canvas';
    retval.label = data.label;
    if (data.canonicalMasterHeight) retval.height = parseInt(data.canonicalMasterHeight, 10);
    if (data.canonicalMasterWidth) retval.width = parseInt(data.canonicalMasterWidth, 10);
    retval.images = [ (new Image(data, { noContext: true })).representation() ];

    return retval;
  }
}
