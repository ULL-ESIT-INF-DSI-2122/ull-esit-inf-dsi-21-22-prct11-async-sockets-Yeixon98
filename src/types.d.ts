export type Request = {
  action: string;
  user: string;
  title?: string;
  body?: string;
  color?: string;
};

export type Response = {
  status: boolean;
  action: string;
  message: string;
  notes?: NoteJSON[];
};

export type NoteJSON = {
  title: string;
  body: string;
  color: string;
};
