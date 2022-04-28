import { Note } from "./note";
import * as fs from "fs";

const chalk = require("chalk");

/**
 * Clase que se encarga de controlar las funciones con las notas
 */
export class NoteManager {

  /**
   * Añadir una nota respecto a un usuario en especifico
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
  addNote(user: string, title: string, body: string, color: string) {
    if (!fs.existsSync(`database/${user}`)) {
      console.log(`${user} directory will be created`);
      fs.mkdirSync(`database/${user}`, {
        recursive: true,
      });
    }
    const note = new Note(title, body, color);
    if (!fs.existsSync(`database/${user}/${title}.json`)) {
      fs.writeFileSync(`database/${user}/${title}.json`, note.print());
      console.log(chalk.green("New note added!"));
      return true;
    } else {
      console.log(chalk.red("Note title taken!"));
      return false;
    }
  }

  /**
   * Borra la nota del usuario con el titulo especificado
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   */
  removeNote(user: string, title: string) {
    if (fs.existsSync(`database/${user}/${title}.json`)) {
      fs.rmSync(`database/${user}/${title}.json`);
      console.log(chalk.green("Note removed!"));
      return true;
    } else {
      console.log(chalk.red("Note not found"));
      return false;
    }
  }

  /**
   * Modifica la nota especificada del usuario
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   * @param body Contenido nuevo de la nota
   * @param color Color de la nota
   */
  modifyNote(user: string, title: string, body: string, color: string) {
    if (fs.existsSync(`database/${user}/${title}.json`)) {
      const note = new Note(title, body, color);
      fs.writeFileSync(`database/${user}/${title}.json`, note.print());
      console.log(chalk.green("Modified note!"));
      return true;
    } else {
      console.log(chalk.red("Note not found"));
      return false;
    }
  }

  /**
   * Se obtienen todas las notas de un usuario en especifico
   * @param user Nombre del usuario
   * @returns Las notas del usuario
   */
  listNotes(user: string) {
    if (fs.existsSync(`database/${user}`) && fs.readdirSync(`database/${user}`).length >= 0 ) {
      const allNotes: Note[] = []
      fs.readdirSync(`database/${user}`).forEach((notes) => {
        const contentNote = fs.readFileSync(`database/${user}/${notes}`);
        const JSONote = JSON.parse(contentNote.toString());
        const note = new Note(JSONote.title, JSONote.body, JSONote.color);
        allNotes.push(note)
        try {
          console.log(chalk.keyword(note.getColor())(note.getTitle()));
        } catch (_) {
          console.log(chalk.cyan(note.getTitle()));
        }
      });
      return allNotes;
    } else {
      console.log(chalk.red("User not found"));
      return false;
    }
  }

  /**
   * Muestra el contenido de la nota con el titulo especificado del usuario
   * en su respectivo color
   * @param user Nombre del usuario
   * @param title Titulo de la nota
   */
  readNote(user: string, title: string) {
    if (fs.existsSync(`database/${user}/${title}.json`)) {
      const contentNote = fs.readFileSync(`database/${user}/${title}.json`);
      const JSONote = JSON.parse(contentNote.toString());
      const note = new Note(JSONote.title, JSONote.body, JSONote.color);
      try {
        console.log(chalk.keyword(note.getColor())(note.getTitle()));
        console.log(chalk.keyword(note.getColor())(note.getBody()));
      } catch (_) {
        console.log(chalk.cyan(note.getTitle()));
        console.log(chalk.cyan(note.getBody()));
      }
      return note;
    } else {
      console.log(chalk.red("Note not found"));
      return false;
    }
  }

  clearDataUser(user: string) {
    if (fs.existsSync(`database/${user}`)) 
      fs.rmSync(`database/${user}`, { recursive: true });
  }
}
