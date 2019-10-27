import {Socket} from 'socket.io';
import * as SocketIO from 'socket.io';
import {Vector3} from 'three';
import SocketModule, {SocketEvent} from './Socket.module';

export interface ICubeInfosTransfert {
  cube: ICubeInfos;
}

export interface ICubeInfos {
  position: Vector3;
}

export enum CubeEvent {
  Move = 'move',
  Moved = 'moved',
  Init = 'initialisation',
  Add = 'add',
  Remove = 'remove',
}

export default class CubeModule extends SocketModule {

  private _cubes: Map<string, ICubeInfos>;

  constructor(io: SocketIO.Server) {
    super(io);
    this._cubes = new Map<string, ICubeInfos>();
  }

  protected initEventEmiters(socket: Socket): void {
    socket.on(CubeEvent.Init, (infos: ICubeInfosTransfert) => this.initialisation(socket, infos));
    socket.on(CubeEvent.Move, (infos: ICubeInfosTransfert) => this.move(socket, infos));
    socket.on(SocketEvent.Disconnect, (id: string) => this.disconnect(socket));
  }

  protected initEventListeners(): void {
  }

  private initialisation(socket: Socket, info: ICubeInfosTransfert) {
    console.log('initialisation', socket.id);
    this._cubes.set(socket.id, {position: info.cube.position});
    this._cubes.forEach((cube: ICubeInfos, key: string) => {
      if (key !== socket.id) {
        console.log('dispatch', cube);
        socket.emit(CubeEvent.Add, {cube, id: key} as ICubeInfosTransfert);
      }
    });
    console.log('initialised, cubes : ', this._cubes);
  }

  private move(socket: Socket, infos: ICubeInfosTransfert) {
    console.log('move', socket.id);
    console.log('cubes', this._cubes);
    const cube = this._cubes.get(socket.id);
    console.log('infos move');
    console.log(infos);
    if (cube) {
      cube.position = infos.cube.position;
      socket.broadcast.emit(CubeEvent.Moved, {
        cube: this._cubes.get(socket.id),
        id: socket.id,
      } as ICubeInfosTransfert);
    } else {
      console.error('le cube existe pas');
    }
    console.log('moved, cubes : ', this._cubes);
  }

  private disconnect(socket: Socket) {
    console.log('delete', socket.id);
    this._cubes.delete(socket.id);
    socket.broadcast.emit(CubeEvent.Remove, socket.id as string);
    console.log('deleted, cubes : ', this._cubes);
  }
}
