import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/v1/post-categories`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
