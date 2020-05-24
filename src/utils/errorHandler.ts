import { IErrorMessage, IErrorTypeMessage } from '../interfaces';
import { E } from '../constans';

export const typesError: any = {
  [E.not_access]: 401,
  [E.invalid_data]: 403,
  [E.critical]: 500,
};

export const errorMessage = (err: Error): IErrorMessage => ({ message: err.message, stack: JSON.stringify(err.stack) });

// Возвращает объект с типом ошибки и экземляром Error;
export const errorTypeMessage = (type: string, error: string | Error): IErrorTypeMessage | Error => {
  const content = typeof error === 'object' ? error : new Error(error);

  return { type, content };
};
