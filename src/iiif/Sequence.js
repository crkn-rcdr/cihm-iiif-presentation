const Entity = require('./Entity');
const Canvas = require('./Canvas');

module.exports = class Sequence extends Entity {
  static fetch(id) {
    return (new Sequence(id))._fetchFromType('item');
  }

  representation(options) {
    if (!this.doc) { return {}; };

    let data = this.doc;
    let retval = super.representation();
    retval['@id'] = [this.endpoint, this.id, 'sequence', 'physical'].join('/')
    retval['@type'] = 'sc:Sequence';
    retval.canvases = data.order.map((id) => {
      return (new Canvas(Object.assign({ _id: id }, data.components[id]), { noContext: true })).representation();
    });

    return retval;
  }
};
