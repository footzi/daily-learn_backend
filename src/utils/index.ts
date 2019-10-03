// Проверяет существование и тип переменной
// eslint-disable-next-line
export const checkTypeValue = (value: any = false, type: string = 'string'): boolean => value && typeof value === type;

// Возвращает объекта ответа от сервера
export const sendData = (data: object | string = '', error: object | string = ''): object => ({ data, error });

// Парсит строку заголовка авторизации
export const parseBearer = (header: string): string => header.replace('Bearer ', '');
