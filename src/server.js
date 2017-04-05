const env = require('require-env');
const copresentationEndpoint = env.requireUrl('COPRESENTATION_ENDPOINT');
const iiifiEndpoint = env.requireUrl('IIIFI_ENDPOINT');

const Koa = require('koa');
const router = require('koa-route');
const error = require('koa-json-error');

const app = new Koa();

app.use(router.get('/', ctx => {
  ctx.body = {
    version: '2.1',
    documentation: 'http://iiif.io/api/presentation/2.1/'
  };
}));

app.use(error(err => {
  var retval = {status: err.status, message: err.message};
  if (!(process.env.NODE_ENV === 'production')) {
    retval.stack = err.stack;
  }
  return retval;
}));

app.listen(3000);
