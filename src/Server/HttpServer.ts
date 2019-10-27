import http, {Server} from 'http';
import ExpressServer from './ExpressServer';

export default class HttpServer {
  private _http: Server;

  get http(): Server {
    return this._http;
  }

  constructor(express: ExpressServer) {
    this._http = http.createServer(express.app);
    this.init();
  }

  private init() {
    this._http.listen(3000, function() {
      console.log('listening on *:3000');
    });
  }

}
