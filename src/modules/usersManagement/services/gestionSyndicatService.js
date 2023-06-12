import axiosInstance from "../../../../../../DOSSIER MEDICAL/dossiermedical2023/src/config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


export const getUniversities = () => {
    return axiosInstance.get(rootLink+ "/listeUniversite",{data: null});
}

export const getOrgans = () => {
    return axiosInstance.get(rootLink+ "/listeOrganes",{data: null});
}

export const getRoles = () => {
  return axiosInstance.get(rootLink+ "/listeRoles",{data: null});
}

export const getPermissions = () => {
  return axiosInstance.get(rootLink + "/listePermissions",{data:null});
}

export const getRolePermissions = (id) => {
  return axiosInstance.get(rootLink + `/listePermissionsRole/${id}`,{data:null});
}

export const getMembres = () => {
  return axiosInstance.get(rootLink + "/listeMembres",{data:null});
}

export const createUniversity = (data)=>{
    return axiosInstance.post(rootLink+ "/createUniv", data, config);
}


export const createOrgan = (data)=>{
  return axiosInstance.post(rootLink+ "/createOrgane", data, config);
}

export const createRole = (data)=>{
  return axiosInstance.post(rootLink+ "/createRole", data, config);

}

export const attributePermissions = (data) => {
  return axiosInstance.put(rootLink + "/givePremission", data, config);
}


export const modifyUniversity = (data)=>{
  return axiosInstance.put(rootLink+ "/updateUniversite", data, config);
}

export const modifyOrgan = (data)=>{
  return axiosInstance.put(rootLink+ "/updateOrgane", data, config);
}

export const modifyRole = (data)=>{
  return axiosInstance.put(rootLink+ "/updateRole", data, config);
}

export const deleteUniversity = (id)=>{
  return axiosInstance.delete(rootLink+ `/deleteUniversity/${id}`,{data:null}, config);
}

export const deleteOrgan = (id)=>{
  return axiosInstance.delete(rootLink+ `/deleteOrgane/${id}`,{data:null}, config);
}

export const deleteRole = (id)=>{
  return axiosInstance.delete(rootLink+ `/deleteRole/${id}`,{data:null}, config);
}


