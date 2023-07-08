import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getUserProfile = (id) => {
    return axiosInstance.get(rootLink + "/user/"+id,{data:null});
  }
  
