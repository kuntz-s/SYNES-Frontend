import axios from "axios";
const axiosInstance = axios;



axiosInstance.interceptors.request.use((req) => {
  const token =localStorage.getItem('userToken') ;
  req.headers.authorization =  token
    ? "Bearer " + token
    : "";
  req.headers["Content-Type"]="application/json";
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('userToken');
      window.location.href = "/login";
    }
    throw err;
  }
);

export default axiosInstance;
