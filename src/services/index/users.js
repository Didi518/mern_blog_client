import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${serverUrl}/users/register`, {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
