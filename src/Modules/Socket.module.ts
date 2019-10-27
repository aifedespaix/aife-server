import {Server, Socket} from 'socket.io';

export enum SocketEvent {
  Connect = 'connection',
  Disconnect = 'disconnect',
}

export default abstract class SocketModule {

  private _io: Server;
  private _sockets: Map<string, Socket>;

  constructor(io: Server) {
    this._io = io;
    this._sockets = new Map<string, Socket>();

    this.init();
  }

  protected abstract initEventEmiters(socket: Socket): void;

  private init() {
    this._io.on(SocketEvent.Connect, (socket: Socket) => {
      this._sockets.set(socket.id, socket);
      this.initEventEmiters(socket);
    });
  }

  // protected abstract initEventListeners(): void;

}
