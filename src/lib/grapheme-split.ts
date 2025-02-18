export const graphemeSplit = (str: string, locale: string) => {
  const segmenter = new Intl.Segmenter(locale, {granularity: 'grapheme'});
  const segitr = segmenter.segment(str);
  return Array.from(segitr, ({segment}) => segment);
}