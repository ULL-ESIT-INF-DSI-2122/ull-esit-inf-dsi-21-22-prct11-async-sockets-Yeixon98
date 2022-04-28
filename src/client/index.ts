import * as yargs from "yargs";
import Client from "./Client";
import { Request } from "../types";
const chalk = require("chalk");

const client = new Client(5000);

/**
 * Comando add para añadir una nota
 */
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    user: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
    color: {
      describe: "Note color",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (
      typeof argv.user === "string" &&
      typeof argv.title === "string" &&
      typeof argv.body === "string" &&
      typeof argv.color === "string"
    ) {
      const request: Request = {
        action: "add",
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.start(request);
    } else {
      console.log(chalk.red("Argument invalid"));
    }
  },
});

/**
 * Comando modify para modificar una nota del usuario
 */
yargs.command({
  command: "update",
  describe: "Update a note",
  builder: {
    user: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
    color: {
      describe: "Note color",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (
      typeof argv.user === "string" &&
      typeof argv.title === "string" &&
      typeof argv.body === "string" &&
      typeof argv.color === "string"
    ) {
      const request: Request = {
        action: "update",
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.start(request);
    } else {
      console.log(chalk.red("Argument invalid"));
    }
  },
});

/**
 * Comando read para leer una nota
 */
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    user: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.user === "string" && typeof argv.title === "string") {
      const request: Request = {
        action: "read",
        user: argv.user,
        title: argv.title,
      };
      client.start(request);
    } else {
      console.log(chalk.red("Argument invalid"));
    }
  },
});

/**
 * Comando list para ver las notas del usuario
 */
yargs.command({
  command: "list",
  describe: "List all note",
  builder: {
    user: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.user === "string") {
      const request: Request = {
        action: "list",
        user: argv.user,
      };
      client.start(request);
    } else {
      console.log(chalk.red("Argument invalid"));
    }
  },
});

/**
 * Comando remove para eliminar una nota
 */
yargs.command({
  command: "delete",
  describe: "Delete a note",
  builder: {
    user: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.user === "string" && typeof argv.title === "string") {
      const request: Request = {
        action: "delete",
        user: argv.user,
        title: argv.title,
      };
      client.start(request);
    } else {
      console.log(chalk.red("Argument invalid"));
    }
  },
});

yargs.parse();
