import {EventEmitter} from 'events';
import { Request } from '../types';

/**
 * Clase EventEmitterServer.
 */
export default class EventEmitterServer extends EventEmitter {
  /**
   * Constructor de la clase EventEmitterServer
   * @param connection Objeto EventEmitter (Socket)
   */
  constructor(connection: EventEmitter) {
    super();

    let allData = '';
    connection.on('data', (dataChunk) => {
      allData += dataChunk.toString();

      let dataLimit = allData.indexOf('\n');

      while (dataLimit !== -1) {
        const request: Request = JSON.parse(allData.substring(0, dataLimit))
        allData = allData.substring(dataLimit + 1);
        this.emit('request', request);
        dataLimit = allData.indexOf('\n');
      }
    });
  }
}