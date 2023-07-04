import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getPublicNotifications = () => {
    return axiosInstance.get(rootLink + "/getNotification",{data:null});
  }
  

  export const getPrivateNotifications = (data) => {
    return axiosInstance.get(rootLink + "/getPrivateNotification",{data:null});
  }
  



