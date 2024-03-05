import axios from "axios";

export const getCart = async (user) => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get-cart/${user._id}`);
  const data = await res.data;
  return data;
};
