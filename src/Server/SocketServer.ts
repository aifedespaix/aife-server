import io, {Server, Socket} from 'socket.io';
import CubeModule from '../Modules/Cube.module';
import HttpServer from './HttpServer';

export default class SocketServer {
  private _io: Server;
  private cubeModule!: CubeModule;

  get io(): any {
    return this._io;
  }

  constructor(httpServer: HttpServer) {
    this._io = io(httpServer.http);
    this.init();
  }

  private init() {
    this.cubeModule = new CubeModule(this.io);
  }
}
