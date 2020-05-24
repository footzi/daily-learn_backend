import { INormalizeDictionary, INormalizeWords } from './i-home';
import { IDictionary, IWord } from '../../interfaces';

export const normailizeDictionaries = (dictionaries: Array<IDictionary>): Array<INormalizeDictionary> => {
  const normalizeWords = (words: Array<IWord>): Array<INormalizeWords> => {
    return words.map((item) => {
      const { id, name, translate, nameCount, translateCount, groupId } = item;
      return { id, name, translate, nameCount, translateCount, groupId };
    });
  };

  return dictionaries.map(
    (item: IDictionary): INormalizeDictionary => {
      const { id, name, words } = item;
      return {
        id,
        name,
        words: normalizeWords(words),
      };
    }
  );
};
