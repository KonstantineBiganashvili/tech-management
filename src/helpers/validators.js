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

export const validMail = (mail) => {
  const regex = new RegExp('[a-z0-9]+@redberry.com');

  return regex.test(mail);
};

export const validNumber = (number) => {
  const regex = new RegExp('^995+[0-9]');

  return regex.test(number);
};
