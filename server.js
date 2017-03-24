const config = require('./config');

const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = Object.assign({"message": "Hi there."}, config);
});

app.listen(3000);
