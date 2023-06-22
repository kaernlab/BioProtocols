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
  labContent: {
    header: string,
    questions: string[],
    footer: string,
  }
  labFinishedBody: string;
}
