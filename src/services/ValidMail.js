export const validMail = (mail) => {
  const regex = new RegExp('[a-z0-9]+@redberry.com');

  return regex.test(mail);
};
