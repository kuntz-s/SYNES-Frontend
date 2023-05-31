import axiosInstance from "../../../../../../DOSSIER MEDICAL/dossiermedical2023/src/config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;


export const getUniversities = () => {
    return axiosInstance.get(rootLink+ "/listeUniversite",{data: null});
}

export const getOrgans = () => {
    return axiosInstance.get(rootLink+ "/listeOrganes",{data: null});
}