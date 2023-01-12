import jsonServer from 'json-server';

import { existsSync, writeFileSync } from 'fs';
import fakeUsers from './src/data/fakeUsers';

const rewrite = require('express-urlrewrite') as any;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const path = './fake-db.json';

try {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({ users: fakeUsers(100) }, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
  } else {
    console.log('File already exists. Skip writing');
  }
} catch (error) {
  console.log('An error has occurred ', error);
}

const router = jsonServer.router('fake-db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);

//server.use(rewrite(/^\/users\/(\w+)\/?$/, '/users/$1?_id=$1'));
/*
server.use((req, _, next) => {
  console.log(req.headers);
  console.log('path: ', req.path);
  console.log(req.query);
  next();
});
*/
/*
(router as any).render = (req: any, res: any) => {
  const id = req.query._id;
  res.jsonp(req.method === 'DELETE' && res.statusCode === 200 && id ? { success: true, id } : res.locals.data);
};
*/
server.use(router);

server.listen(4000, () => {
  console.log('JSON Server is running');
});
