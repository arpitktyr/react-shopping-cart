import axios from "axios";

export const getWrapper = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw new Error("internal server error !, Try again.");
  }
};

//we need to add common functions there
