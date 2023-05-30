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

export interface ILab {
  id: string;
  title: string;
}

export interface ITime {
  hours: number,
  minutes: number,
  seconds: number
}
