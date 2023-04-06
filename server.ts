import jsonServer from 'json-server';
import { existsSync, writeFileSync } from 'fs';
import fakeUsers from './src/lib/fakeUsers';
import { getReasonPhrase } from 'http-status-codes';

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

(router as any).render = (req: any, res: any) => {
  res.jsonp(JSON.stringify(res.locals.data) === '{}' && res.statusCode >= 400 ? { error: getReasonPhrase(res.statusCode) } : res.locals.data);
};

server.use(router);

server.listen(4000, () => {
  console.log('JSON Server is running');
});
