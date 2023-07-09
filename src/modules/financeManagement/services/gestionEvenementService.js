import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getEvenements = () => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/listeEvents",{data:null});
  }
  

  export const createEvenement = (data) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink + "/createEvent",data, config);
  }
  

  export const deleteEvenement = (id) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.delete(rootLink + `/deleteEvent/${id}`,{data:null});
  }
  



