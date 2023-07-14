import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export const authenticateUser = (data) => {
  localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink+ "/login", data, config);
}