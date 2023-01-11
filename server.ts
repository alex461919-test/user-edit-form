import jsonServer from 'json-server';
import { existsSync, writeFileSync } from 'fs';
import fakeUsers from './src/data/fakeUsers';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const path = './fake-db.json';

try {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({ users: fakeUsers() }, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
  } else {
    console.log('File already exists. Skip writing');
  }
} catch (error) {
  console.log('An error has occurred ', error);
}

const router = jsonServer.router('fake-db.json');

server.use(middlewares);
server.use((req, _, next) => {
  console.log(req.headers);
  next();
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
