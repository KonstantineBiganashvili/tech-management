export const validMail = (mail) => {
  let regex = new RegExp('[a-z0-9]+@redberry.com');

  return regex.test(mail);
};
