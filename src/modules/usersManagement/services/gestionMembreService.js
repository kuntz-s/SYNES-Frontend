import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export const getMembers = () => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/listeMembres",{data:null});
  }
  

  export const createMember = (data)=>{
    localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink+ "/register", data, config);
}

export const putMemberRole = (data, restrict)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.put(rootLink+ `${restrict ? "/giveRoleOrgane":"/giveRoleSystem"}`, data, config);
}


export const postAvertissement = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink+  "/giveAvertissement", data, config);
}

