import axios from "axios";

// export const getWrapper = async (url) => {
//   try {
//     const response = await axios.get(url);
//     return response;
//   } catch (err) {
//     throw new Error("internal server error !, Try again.");
//   }
// };

//we need to add common functions there

export const getWrapper = async (
  url,
  method = "GET",
  headers = {},
  data = null
) => {
  try {
    const config = {
      method,
      url,
      headers,
      data,
    };

    const response = await axios(config);
    return response;
  } catch (err) {
    console.dir(err);
    throw new Error("Internal server error! Please try again.");
  }
};
