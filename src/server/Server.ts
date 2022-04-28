import * as net from "net";
import { NoteJSON, Request, Response } from "../types";
import { EventEmitterServer } from "./EventEmitterServer";
import { NoteManager } from "../NoteManager/noteManager";
import { Note } from "../NoteManager/note";

/**
 * Clase que representa el servidor en la conecion
 */
export default class Server {
  private noteManager;
  constructor(private readonly port: number) {
    this.noteManager = new NoteManager();
  }

  /**
   * Da comienzo a la escucha del servidor
   */
  start = () => {
    const server = net.createServer((connection) => {
      const emitter = new EventEmitterServer(connection);

      emitter.on("request", (request: Request) => {
        console.log("\n" + request.user + " connected");
        let response: Response = {
          status: false,
          action: "err",
          message: "Bad Request",
        };
        switch (request.action) {
          case "add":
            if (request.title && request.body && request.color) {
              const result = this.noteManager.addNote(
                request.user,
                request.title,
                request.body,
                request.color
              );
              response = {
                status: result,
                action: "add",
                message: result ? "New note added!" : "Note title taken!",
              };
            }
            break;
          case "update":
            if (request.title && request.body && request.color) {
              const result = this.noteManager.modifyNote(
                request.user,
                request.title,
                request.body,
                request.color
              );
              response = {
                status: result,
                action: "update",
                message: result ? "Modified note!" : "Note not found",
              };
            }
            break;
          case "delete":
            if (request.title) {
              const result = this.noteManager.removeNote(
                request.user,
                request.title
              );
              response = {
                status: result,
                action: "delete",
                message: result ? "Note removed!" : "Note not found",
              };
            }
            break;
          case "list":
            const notes = this.noteManager.listNotes(request.user);
            if (notes) {
              const notesJSON: NoteJSON[] = notes.map((note: Note) => {
                const tmp: NoteJSON = {
                  title: note.getTitle(),
                  body: note.getBody(),
                  color: note.getColor(),
                };
                return tmp;
              });
              response = {
                status: true,
                action: "list",
                message: "",
                notes: notesJSON,
              };
            } else {
              response = {
                status: false,
                action: "list",
                message: "User not found",
              };
            }
            break;
          case "read":
            if (request.title) {
              const note = this.noteManager.readNote(
                request.user,
                request.title
              );
              if (note) {
                const noteJSON: NoteJSON = {
                  title: note.getTitle(),
                  body: note.getBody(),
                  color: note.getColor(),
                };
                const notesJSON: NoteJSON[] = [noteJSON];
                response = {
                  status: true,
                  action: "read",
                  message: "",
                  notes: notesJSON,
                };
              } else {
                response = {
                  status: false,
                  action: "read",
                  message: "Note not found",
                };
              }
            }
            break;
          default:
            break;
        }

        connection.write(JSON.stringify(response), (err) => {
          if (err) console.log("Fail to send response");
          connection.end();
        });

        connection.on("close", () => {
          console.log(request.user + " disconnect\n");
        });
      });
    });

    server.listen(this.port, () => {
      console.log("\nServer is running\n");
    });
  };
}
