import { IErrorMessage, IErrorTypeMessage } from '../interfaces';

// Проверяет существование и тип переменной
// eslint-disable-next-line
export const checkTypeValue = (value: any = false, type: string = 'string'): boolean => value && typeof value === type;

// Возвращает объекта ответа от сервера
export const sendData = (data: object | string = '', error: object | string = ''): object => ({ data, error });

// Возвращает объект ошибки
export const errorMessage = (err: Error): IErrorMessage => ({ message: err.message, stack: JSON.stringify(err.stack) });

// Возвращает объект с типом ошибки и экземляром Error;
export const errorTypeMessage = (type: string, error: string | Error): IErrorTypeMessage => {
  const content = typeof error === 'object' ? error : new Error(error);

  // @ts-ignore
  if (error.content && error.type) {
    // @ts-ignore
    return error;
  }

   // @ts-ignore
  return {
    // @ts-ignore
    type,
    // @ts-ignore
    content
  };
};

// Парсит строку заголовка авторизации
export const parseBearer = (header: string): string => header.replace('Bearer ', '');
