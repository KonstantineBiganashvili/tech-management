import Axios from 'axios';

export const withOutBody = async (method, url) => {
  const items = await Axios({
    method: `${method}`,
    url: `https://pcfy.redberryinternship.ge/api/${url}`,
  });

  const data = await items.data;
  return data;
};
