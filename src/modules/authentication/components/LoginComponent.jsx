import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "../../../components/baseComponents/Input";
import loginImage from "../../../assets/loginIllustration.png";
import logo from "../../../assets/logo.png";



const imageContainerVariants = {
  hidden:{
    x:'-100vw',
    opacity:0
  },

  visible:{
    opacity:1,
    x:0 ,
    transition:{
      type:'tween', 
      duration:1.2
    }
  }
}

 

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = () => {
   
      if(!isLoading){
        setIsLoading(true);
        setTimeout(() => {
          if(!loginInfo.email || !loginInfo.password){
            toast.error("Veuillez entrer des valeurs correctes", {
              position: "top-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
            setIsLoading(false)
          } else {
            toast.success("connexion réussie", {
              position: "top-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
            navigate("/");
          }
        },2000)
      }
  }

  return (
    <section className="overflow-hidden min-h-screen flex flex-col md:flex-row justify-center md:items-center w-[85%] mx-auto py-4 md:py-[0px] ">
      <motion.div
      variants={imageContainerVariants}
        initial="hidden"
        animate="visible"
      className=" md:basis-1/2 mx-auto md:pr-2">
        <img
          src={loginImage}
          alt="login"
          className="scale-[1.1] origin-left shrink-0 md:translate-x-[-50px] lg:translate-x-[0px]"
        />
      </motion.div>
      <div 
      className="md:basis-1/2 flex  flex-col items-center text-center  ">
        <img
          src={logo}
          alt="logo"
          className="w-[65px] md:w-[90px] h-[65px] md:h-[90px] hover:cursor-pointer"
          onClick={() => {navigate("/")}}
        />
        <div className="mt-2">
          <p className="font-montserrat font-bold text-2xl">Connectez-vous</p>
          <p className="text-gray">
            Veuillez entrer vos identifiants de connexion
          </p>
        </div>
        <div className="w-full md:w-[350px] mx-auto mt-4">
          <div>
            <Input
              title="Email"
              name="email"
              type="email"
              value={loginInfo.email}
              handleChange={handleChange}
              style={{ borderRadius: 0 }}
            />
            <Input
              title="Mot de passe"
              name="password"
              value={loginInfo.password}
              handleChange={handleChange}
              style={{ borderRadius: 0 }}
            />
          </div>
          <div>
            <button className="bg-primary text-white w-full py-2 mt-4 text-sm hover:bg-primary/90 hover:cursor-pointer" onClick={handleLogin}>
            {isLoading && <CircularProgress size="18px" color="inherit" />}
              {!isLoading && "connexion"}
            </button>
            <p className="text-center hover:underline hover:cursor-pointer text-sm my-3">Mot de passe oublié ?</p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default LoginComponent;
