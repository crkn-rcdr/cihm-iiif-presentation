const env = require('require-env');
const copresentationEndpoint = env.requireUrl('COPRESENTATION_ENDPOINT');
const iiifiEndpoint = env.requireUrl('IIIFI_ENDPOINT');

const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = {
    copresentation: copresentationEndpoint,
    iiifi: iiifiEndpoint
  };
});

app.listen(3000);
