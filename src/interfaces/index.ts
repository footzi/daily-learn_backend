export interface IFormLogin {
  login: string;
  password: string;
}

export interface IErrorMessage {
  message: string;
  stack: string;
}

export interface IErrorTypeMessage {
  type: string;
  content: Error;
}
