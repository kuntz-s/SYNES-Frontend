import axiosInstance from "../../../../../../DOSSIER MEDICAL/dossiermedical2023/src/config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getEvenements = () => {
    return axiosInstance.get(rootLink + "/listeEvents",{data:null});
  }
  

  export const createEvenement = () => {
    return axiosInstance.post(rootLink + "/createEvent",data, config);
  }
  

