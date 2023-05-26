export interface ILabProtocols {
  header: string,
  questions: string[],
  footer: string,
}

export interface ILabData {
  title: string;
  labStartBody: string;
  labContent: ILabProtocols;
  labFinishedBody: string;
}