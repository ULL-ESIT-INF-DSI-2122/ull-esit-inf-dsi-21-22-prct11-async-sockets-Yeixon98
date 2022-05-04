import "mocha";
import { expect } from "chai";
import EventEmitterServer from '../src/server/EventEmitterServer'
import { EventEmitter } from "events";
import { Request } from "../src/types";

describe("Event Emitter Server", () => {
  it("Socket Server 1 Add", () => {
    const socket = new EventEmitter();
    const server = new EventEmitterServer(socket);

    server.on('request', (req: Request) => {
      expect(req.action).to.eql("add")
      expect(req.user).to.eql("User1")
      expect(req.title).to.eql("Title1")
      expect(req.body).to.eql("Body1")
      expect(req.color).to.eql("red")
      
    })

    socket.emit('data', '{"action": "add",');
    socket.emit('data', '"user": "User1",');
    socket.emit('data', '"title": "Title1",');
    socket.emit('data', '"body": "Body1",');
    socket.emit('data', '"color": "red"}\n');
  });

  it("Socket Server 2 Read", () => {
    const socket = new EventEmitter();
    const server = new EventEmitterServer(socket);

    server.on('request', (req: Request) => {
      expect(req.action).to.eql("read")
      expect(req.user).to.eql("User1")
      expect(req.title).to.eql("Title1")
    })

    socket.emit('data', '{"action": "read",');
    socket.emit('data', '"user": "User1",');
    socket.emit('data', '"title": "Title1"}\n');
  });
});
