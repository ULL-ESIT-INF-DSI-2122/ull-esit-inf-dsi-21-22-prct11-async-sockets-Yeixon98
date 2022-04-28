import { EventEmitter } from "events";
import { Response } from "../types";

/**
 * Clase EventEmitterClient.
 */
export default class EventEmitterClient extends EventEmitter {
  /**
   * Permite emitir al cliente la respuesta obtenida del servidor
   * a través de la coneccion establecida.
   * @param connection Coneccion establecida
   */
  constructor(connection: EventEmitter) {
    super();

    let allData = "";
    connection.on("data", (dataChunk) => {
      allData += dataChunk;
    });

    connection.on("end", () => {
      const response: Response = JSON.parse(allData);
      this.emit("response", response);
    });
  }
}
