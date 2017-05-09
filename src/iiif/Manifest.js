const Entity = require('./Entity');
const Sequence = require('./Sequence');

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

function within(pkey, collections, endpoint) {
  let list = [];
  let collectionLink = (c) => { return [endpoint, 'collection', c].join('/'); }
  if (pkey) list.push(collectionLink(pkey));
  if (collections) collections.forEach((c) => list.push(collectionLink(c)));
  return list;
}

module.exports = class Manifest extends Entity {
  static fetch(id) {
    return (new Manifest(id))._fetchFromItem();
  }

  representation() {
    if (!this.doc) { return {}; };

    let data = this.doc;
    let retval = super.representation();
    retval['@type'] = 'sc:Manifest';
    retval['@id'] = [this.endpoint, this.id, 'manifest'].join('/');
    retval.label = data.plabel ? [data.plabel, data.label].join(' : ') : data.label;
    retval.metadata = cmrMetadataFields.reduce((list, field) => {
      if (data[field]) list.push({ label: field, value: data[field] });
      return list;
    }, []);
    if (data.ab) retval.description = data.ab.join(' ');
    if (data.pkey || data.collection) retval.within = within(data.pkey, data.collection, this.endpoint);
    retval.sequences = [ (new Sequence(data, { noContext: true })).representation() ];

    return retval;
  }
};
