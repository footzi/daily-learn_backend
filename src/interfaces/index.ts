export interface IPayloadAccessToken {
  login: string;
  password: string;
}

export interface IPayloadRefreshToken {
  id: number;
}

export interface IFormLogin {
  login: string;
  password: string;
}

export interface IErrorMessage {
  error: {
    message: string;
    stack: string;
  };
}

export interface IErrorTypeMessage {
  type: string;
  content: Error;
}

export interface IToken {
  userId: number;
  refresh: string;
}