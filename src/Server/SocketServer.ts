import io, {Server, Socket} from 'socket.io';
import CharacterModule from '../Modules/Character.module';
import HttpServer from './HttpServer';

export default class SocketServer {
  private _io: Server;
  private cubeModule!: CharacterModule;

  get io(): any {
    return this._io;
  }

  constructor(httpServer: HttpServer) {
    this._io = io(httpServer.http);
    this.init();
  }

  private init() {
    this.cubeModule = new CharacterModule(this.io);
  }
}
