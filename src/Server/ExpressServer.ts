import express, {Express, Request, Response} from 'express';

export default class ExpressServer {

  private _app: Express;

  get app() {
    return this._app;
  }

  constructor() {
    this._app = express();
  }

}
