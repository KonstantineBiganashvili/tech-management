export const validNumber = (number) => {
  const regex = new RegExp('995+[0-9]{12}');

  return regex.test(number);
};
