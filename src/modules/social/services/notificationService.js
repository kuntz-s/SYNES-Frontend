import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getPublicNotifications = () => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/getNotification",{data:null});
  }
  

  export const getPrivateNotifications = (data) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/getPrivateNotification",{data:null});
  }
  



