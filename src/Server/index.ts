import ExpressServer from './ExpressServer';
import HttpServer from './HttpServer';
import SocketServer from './SocketServer';

export default class Server {

  public httpServer: HttpServer;
  public expressServer: ExpressServer;
  public socketServer: SocketServer;

  constructor() {
    this.expressServer = new ExpressServer();
    this.httpServer = new HttpServer(this.expressServer);
    this.socketServer = new SocketServer(this.httpServer);
  }
}
