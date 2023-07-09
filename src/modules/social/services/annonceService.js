import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getListAnnonce = (id) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/listeAnnonce",{data:null});
  }
  

  export const getPiecesJointes = (id)=>{
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/pieceJointeAnnonce/"+id,{data:null});
  }
  

  export const createAnnonce = (data)=>{
    localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink+ "/createAnnonce", data, config);
  }
  
  export const createPieceJointe = (data)=>{
    localStorage.setItem("fileType", true);
    return axiosInstance.post(rootLink+ "/createPieceJointe", data, config);
  }

