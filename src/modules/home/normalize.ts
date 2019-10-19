import { INormalizeDictionary, INormalizeWords } from './i-home';
import { IDictionary, IWord } from '../../entities/interfaces';

export const normailizeDictionaties = (dictionaries: Array<IDictionary>): Array<INormalizeDictionary> => {
  const normalizeWords = (words: Array<IWord>): Array<INormalizeWords> => {
    return words.map(item => {
      const { id, en, ru, en_count, ru_count } = item;
      return {
        id,
        en: {
          name: en,
          count: en_count
        },
        ru: {
          name: ru,
          count: ru_count
        }
      };
    });
  };

  return dictionaries.map(
    (item: IDictionary): INormalizeDictionary => {
      const { id, name, words } = item;
      return {
        id,
        name,
        words: normalizeWords(words)
      };
    }
  );
};

export const t = () => {};
