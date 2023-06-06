export interface IFormValues {
  username: string;
  password: string;
  generalError: string;
}

export interface ICredentials {
  username: string;
  password: string;
}

export interface ILab {
  id: string;
  title: string;
}

export interface ILabData {
  title: string;
  labStartBody: string;
  labContent: ILabProtocols;
  labFinishedBody: string;
}

export interface ILabProtocols {
  header: string,
  questions: string[],
  footer: string,
}

export interface EditableContent {
  title: string;
  startBody: string;
  content: {
    header: string,
    questions: string[],
    footer: string,
  }
  finishedBody: string;
}
