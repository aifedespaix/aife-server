import {Socket} from 'socket.io';
import * as SocketIO from 'socket.io';
import {Vector3} from 'three';
import SocketModule, {SocketEvent} from './Socket.module';

export interface ICharacter {
  position: Vector3;
}

export interface IOtherCharacter extends ICharacter {
  id: string;
}

export enum CharacterEvent {
  Move = 'move',
  Moved = 'moved',
  Init = 'initialisation',
  Add = 'add',
  Remove = 'remove',
}

export default class CharacterModule extends SocketModule {

  private readonly _characters: Map<string, ICharacter>;

  constructor(io: SocketIO.Server) {
    super(io);
    this._characters = new Map<string, ICharacter>();
  }

  protected initEventEmiters(socket: Socket): void {
    socket.on(CharacterEvent.Init, (character: ICharacter) => this.initialisation(socket, character));
    socket.on(CharacterEvent.Move, (character: ICharacter) => this.move(socket, character));
    socket.on(SocketEvent.Disconnect, () => this.disconnect(socket));
  }

  protected initEventListeners(): void {
  }

  private initialisation(socket: Socket, character: ICharacter) {
    this._characters.set(socket.id, {position: character.position});
    socket.broadcast.emit(CharacterEvent.Add, {...character, id: socket.id} as IOtherCharacter);
    this._characters.forEach((character: ICharacter, key: string) => {
      if (key !== socket.id) {
        console.log('dispatch', character);
        socket.emit(CharacterEvent.Add, {...character, id: key} as IOtherCharacter);
      }
    });
  }

  private move(socket: Socket, character: ICharacter) {
    this._characters.set(socket.id, character);
    socket.broadcast.emit(CharacterEvent.Moved, {
      ...character,
      id: socket.id,
    } as IOtherCharacter);
  }

  private disconnect(socket: Socket) {
    console.log('delete', socket.id);
    this._characters.delete(socket.id);
    socket.broadcast.emit(CharacterEvent.Remove, socket.id);
  }
}
