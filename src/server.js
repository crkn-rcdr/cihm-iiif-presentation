const env = require('require-env');
const copresentationEndpoint = env.requireUrl('COPRESENTATION_ENDPOINT');
const iiifiEndpoint = env.requireUrl('IIIFI_ENDPOINT');

const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = {
    version: '2.1',
    documentation: 'http://iiif.io/api/presentation/2.1/'
  };
});

app.listen(3000);
