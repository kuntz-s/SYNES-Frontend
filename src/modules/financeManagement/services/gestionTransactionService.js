import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getTransactions = () => {
    return axiosInstance.get(rootLink + "/listeTransaction",{data:null});
  }
  

  export const createTransaction = (data) => {
    return axiosInstance.post(rootLink + "/createTransaction",data, config);
  }
  

  export const deleteTransaction = (id) => {
    return axiosInstance.delete(rootLink + `/deleteTransaction/${id}`,{data:null});
  }
  



