const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = {"message": "Hi there."};
});

app.listen(3000);
