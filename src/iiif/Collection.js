const Entity = require('./Entity');
const Manifest = require('./Manifest');

const cmrMetadataFields = [
  'au',
  'ti',
  'pu',
  'identifier',
  'su',
  'no_rights',
  'no_source',
  'no',
  'ab',
  'collection',
  'lang',
  'depositor'
];

function within(collections, endpoint) {
  let list = [];
  let collectionLink = (c) => { return [endpoint, 'collection', c].join('/'); }
  if (collections) collections.forEach((c) => list.push(collectionLink(c)));
  return list;
}

module.exports = class Collection extends Entity {
  static fetch(id) {
    return (new Collection(id))._fetchFromType('collection');
  }

  representation() {
    if (!this.doc) { return {}; };

    let data = this.doc;
    let retval = super.representation();
    retval['@type'] = 'sc:Collection';
    retval['@id'] = [this.endpoint, this.id, 'collection'].join('/');
    retval.label = data.label;
    retval.metadata = cmrMetadataFields.reduce((list, field) => {
      if (data[field]) list.push({ label: field, value: data[field] });
      return list;
    }, []);
    if (data.ab) retval.description = data.ab.join(' ');
    if (data.collection) retval.within = within(data.collection, this.endpoint);
    retval.manifests = data.order.map((id) => {
      let item = data.items[id];
      return {
        '@id': [this.endpoint, id, 'manifest'].join('/'),
        '@type': 'sc:Manifest',
        label: item.label
      };
    });

    return retval;
  }
};
