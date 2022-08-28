export const validNumber = (number) => {
  let regex = new RegExp('995+[0-9]');

  return regex.test(number);
};
