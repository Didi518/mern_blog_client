import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/v1/posts`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${serverUrl}/api/v1/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
