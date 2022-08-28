export const checkAlphabet = (string) => {
  const georgianAlphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ ';

  const stringArr = string.split('');

  let n = [];

  stringArr.forEach((element) => {
    if (!georgianAlphabet.includes(element)) {
      n++;
    }
  });

  return n;
};
