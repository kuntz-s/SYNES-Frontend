import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getUserProfile = (id) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/user/"+id,{data:null});
  }
  

  export const updateUserProfile = (data) => {
    localStorage.setItem("fileType", true);
    return axiosInstance.post(rootLink+ "/setImg", data, config);
  }
