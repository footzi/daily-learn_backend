import { IErrorMessage, IErrorTypeMessage } from '../interfaces';

// Проверяет существование и тип переменной
// eslint-disable-next-line
export const checkTypeValue = (value: any = false, type: string = 'string'): boolean => value && typeof value === type;

// Возвращает объект ошибки
export const errorMessage = (err: Error): IErrorMessage => {
  const error = { message: err.message, stack: JSON.stringify(err.stack) };
  return { error };
};

// Возвращает объект с типом ошибки и экземляром Error;
export const errorTypeMessage = (type: string, error: string | Error): IErrorTypeMessage => {
  console.log(error);
  if (error.content && error.type) {
    return error;
  }
  const content = typeof error === 'object' ? error : new Error(error);

  return {
    type,
    content
  };
};

// Парсит строку заголовка авторизации
export const parseBearer = (header: string) => {
  return header.replace('Bearer ','');
}