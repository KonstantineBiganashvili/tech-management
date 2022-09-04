import Axios from 'axios';

export const withOutToken = async (method, url) => {
  const items = await Axios({
    method,
    url: `https://pcfy.redberryinternship.ge/api/${url}`,
  });

  const data = await items.data;
  return data;
};

export const withToken = async (method, url, token, id) => {
  const finalLink = id
    ? `${url}/${id}?token=${token}`
    : `${url}?token=${token}`;

  try {
    const items = await Axios({
      method,
      url: `https://pcfy.redberryinternship.ge/api/${finalLink}`,
    });

    const data = await items.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postMethod = (body) => {
  for (const pair of body.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }

  Axios.post('https://pcfy.redberryinternship.ge/api/laptop/create', body)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
