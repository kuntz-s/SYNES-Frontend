import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getSolde = () => {
    return axiosInstance.get(rootLink + "/getSolde",{data:null});
  }
  
  



