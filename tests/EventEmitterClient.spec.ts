import "mocha";
import { expect } from "chai";
import EventEmitterClient from '../src/client/EventEmitterClient'
import { EventEmitter } from "events";
import { Response } from "../src/types";

describe("Event Emitter Client", () => {
  it("Socket Client 1 Add", () => {
    const socket = new EventEmitter();
    const client = new EventEmitterClient(socket);

    client.on('response', (res: Response) => {
      expect(res.status).to.eql('true')
      expect(res.action).to.eql('add')
      expect(res.message).to.eql("New note added!")
      
    })

    socket.emit('data', '{"status": "true",');
    socket.emit('data', '"action": "add",');
    socket.emit('data', '"message": "New note added!"}');
    socket.emit('end');
  });

  it("Socket Client 2 Delete", () => {
    const socket = new EventEmitter();
    const client = new EventEmitterClient(socket);

    client.on('response', (res: Response) => {
      expect(res.status).to.eql('false')
      expect(res.action).to.eql('delete')
      expect(res.message).to.eql("Note not found!")
      
    })

    socket.emit('data', '{"status": "false",');
    socket.emit('data', '"action": "delete",');
    socket.emit('data', '"message": "Note not found!"}');
    socket.emit('end');
  });
});
