// app.get('/', function (req: Request, res: Response) {
//   res.send('<h1>Hello world</h1>');
// });

import {Request, Response} from 'express';
import Server from './Server';

const server = new Server();
server.expressServer.app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world</h1>');
});
