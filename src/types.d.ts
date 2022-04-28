/**
 * Representan la estructura de una peticion
 */
export type Request = {
  action: string;
  user: string;
  title?: string;
  body?: string;
  color?: string;
};

/**
 * Representan la estructura de una respuesta
 */
export type Response = {
  status: boolean;
  action: string;
  message: string;
  notes?: NoteJSON[];
};

/**
 * Representan la estructura de las notas en formato JSON
 */
export type NoteJSON = {
  title: string;
  body: string;
  color: string;
};
