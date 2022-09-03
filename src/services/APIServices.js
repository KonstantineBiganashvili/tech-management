import Axios from 'axios';

export const withOutBody = async (method, url) => {
  const items = await Axios({
    method,
    url: `https://pcfy.redberryinternship.ge/api/${url}`,
  });

  const data = await items.data;
  return data;
};

export const withBody = async (method, url) => {
  // const newBody = JSON.stringify(body);

  try {
    const items = await Axios({
      method,
      url: `https://pcfy.redberryinternship.ge/api/${url}?token=7bbb011efcb959c1a848307bcc39a10e`,
    });

    const data = await items.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
