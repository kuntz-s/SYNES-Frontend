import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


export const getUniversities = () => {
  localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink+ "/listeUniversite",{data: null});
}

export const getOrgans = () => {
  localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink+ "/listeOrganes",{data: null});
}

export const getRoles = () => {
  localStorage.setItem("fileType", false);
  return axiosInstance.get(rootLink+ "/listeRoles",{data: null});
}

export const getPermissions = () => {
  localStorage.setItem("fileType", false);
  return axiosInstance.get(rootLink + "/listePermissions",{data:null});
}

export const getRolePermissions = (id) => {
  localStorage.setItem("fileType", false);
  return axiosInstance.get(rootLink + `/listePermissionsRole/${id}`,{data:null});
}


export const createUniversity = (data)=>{
  localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink+ "/createUniv", data, config);
}


export const createOrgan = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink+ "/createOrgane", data, config);
}

export const createRole = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink+ "/createRole", data, config);

}

export const attributePermissions = (data) => {
  localStorage.setItem("fileType", false);
  return axiosInstance.put(rootLink + "/givePremission", data, config);
}


export const modifyUniversity = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.put(rootLink+ "/updateUniversite", data, config);
}

export const modifyOrgan = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.put(rootLink+ "/updateOrgane", data, config);
}

export const modifyRole = (data)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.put(rootLink+ "/updateRole", data, config);
}

export const deleteUniversity = (id)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.delete(rootLink+ `/deleteUniversity/${id}`,{data:null}, config);
}

export const deleteOrgan = (id)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.delete(rootLink+ `/deleteOrgane/${id}`,{data:null}, config);
}

export const deleteRole = (id)=>{
  localStorage.setItem("fileType", false);
  return axiosInstance.delete(rootLink+ `/deleteRole/${id}`,{data:null}, config);
}


