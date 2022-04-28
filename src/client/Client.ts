import * as net from "net";
import { Note } from "../NoteManager/note";
import { NoteJSON, Request, Response } from "../types";
const chalk = require("chalk");

import EventEmitterClient from "./EventEmitterClient";

/**
 * Clase que representa el cliente en la conecion
 */
export default class Client {
  constructor(private readonly port: number) {}

  /**
   * Da comienzo a la peticion
   * @param request Peticion que se relaizara al servidor
   */
  start = (request: Request) => {
    const client = net.connect({ port: this.port });

    const emitter = new EventEmitterClient(client);

    emitter.on("response", (res: Response) => {
      switch (res.action) {
        case "add":
        case "update":
        case "delete":
          res.status
            ? console.log(chalk.green(res.message))
            : console.log(chalk.red(res.message));
          break;
        case "list":
          !res.status
            ? console.log(chalk.red(res.message))
            : res.notes?.forEach((note: NoteJSON) => {
                try {
                  console.log(chalk.keyword(note.color)(note.title));
                } catch (_) {
                  console.log(chalk.cyan(note.title));
                }
              });
          break;
        case "read":
          if (!res.status) {
            console.log(chalk.red(res.message));
          } else if (res.notes) {
            try {
              console.log(
                chalk.keyword(res.notes[0].color)(res.notes[0].title)
              );
              console.log(chalk.keyword(res.notes[0].color)(res.notes[0].body));
            } catch (_) {
              console.log(chalk.cyan(res.notes[0].title));
              console.log(chalk.cyan(res.notes[0].body));
            }
          }
          break;
        default:
          console.log(chalk.red(res.message));
          break;
      }
    });

    client.write(JSON.stringify(request) + "\n", (err) => {
      if (err) {
        console.log("Fail to send request");
      }
    });
  };
}
