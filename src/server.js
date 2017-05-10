const Koa = require('koa');
const router = require('koa-route');
const error = require('koa-json-error');
const cors = require('kcors');

const Manifest = require('./iiif/Manifest');
const Sequence = require('./iiif/Sequence');
const Canvas = require('./iiif/Canvas');
const Image = require('./iiif/Image');

const app = new Koa();

app.use(cors({ origin: '*' }));

app.use(router.get('/', async (ctx) => {
  ctx.body = {
    version: '2.1',
    documentation: 'http://iiif.io/api/presentation/2.1/'
  };
}));

app.use(router.get('/iiif/:id/manifest', async (ctx, id) => {
  let manifest = await Manifest.fetch(id);
  if (manifest.error) {
    Object.assign(ctx, manifest.errorContext());
  } else {
    ctx.body = manifest.representation();
  }
}));

app.use(router.get('/iiif/:id/sequence/physical', async (ctx, id) => {
  let sequence = await Sequence.fetch(id);
  if (sequence.error) {
    Object.assign(ctx, sequence.errorContext());
  } else {
    ctx.body = sequence.representation();
  }
}));

app.use(router.get('/iiif/:itemId/canvas/:componentId', async (ctx, itemId, componentId) => {
  let id = [itemId, componentId].join('.');
  let canvas = await Canvas.fetch(id);
  if (canvas.error) {
    Object.assign(ctx, canvas.errorContext());
  } else {
    ctx.body = canvas.representation();
  }
}))

app.use(router.get('/iiif/:itemId/annotation/:componentId', async (ctx, itemId, componentId) => {
  let id = [itemId, componentId].join('.');
  let image = await Image.fetch(id);
  if (image.error) {
    Object.assign(ctx, image.errorContext());
  } else {
    ctx.body = image.representation();
  }
}))

app.use(error(err => {
  var retval = {status: err.status, message: err.message};
  if (!(process.env.NODE_ENV === 'production')) {
    retval.stack = err.stack;
  }
  return retval;
}));

app.listen(3000);
