import axiosInstance from "../../../../../../DOSSIER MEDICAL/dossiermedical2023/src/config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getMembers = () => {
    return axiosInstance.get(rootLink + "/listeMembres",{data:null});
  }
  

  export const createMember = (data)=>{
    return axiosInstance.post(rootLink+ "/register", data, config);
}

export const putMemberRole = (data, restrict)=>{
  return axiosInstance.put(rootLink+ `${restrict ? "/giveRoleOrgane":"/giveRoleSystem"}`, data, config);
}


export const postAvertissement = (data)=>{
  return axiosInstance.post(rootLink+  "/giveAvertissement", data, config);
}

