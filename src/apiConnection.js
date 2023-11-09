import axios from "axios";

const apiConnection = async (endpoint, method, payload = null) => {
  return await axios({
    method,
    url: `http://127.0.0.1:8000${endpoint}`,
    data: {
      ...payload,
    },
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};

export default apiConnection;
