import React, { useState, useEffect } from "react";
import { BsEyeFill, BsEyeSlashFill  } from "react-icons/bs";
import {GoMail} from "react-icons/go";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginUser } from "../../../redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "../../../components/baseComponents/Input";
import loginImage from "../../../assets/img/loginIllustration.png";
import logo from "../../../assets/img/logo.png";

const imageContainerVariants = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 1.2,
    },
  },
};

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector(
    (state) => state.user
  );
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    
  const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/social");
    } else {
      if (error && !success) {
        toast.error("Utilisateur non trouvé", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else if (success && !error) {
        navigate("/social/actualite");
      }
    }
  }, [error, success]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("Veuillez renseigner des valeurs sur tous les champs", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      dispatch(
        loginUser({ email: loginInfo.email, password: loginInfo.password })
      );
    }
  };

  return (
    <section className="overflow-hidden min-h-screen flex flex-col md:flex-row justify-center md:items-center w-[85%] mx-auto py-4 md:py-[0px] ">
      <motion.div
        variants={imageContainerVariants}
        initial="hidden"
        animate="visible"
        className=" md:basis-1/2 mx-auto md:pr-2"
      >
        <img
          src={loginImage}
          alt="login"
          className="scale-[1.1] origin-left shrink-0 md:translate-x-[-50px] lg:translate-x-[0px]"
        />
      </motion.div>
      <div className="md:basis-1/2 flex  flex-col items-center text-center  ">
        <img
          src={logo}
          alt="logo"
          className="w-[65px] md:w-[90px] h-[65px] md:h-[90px] hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
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
              icon={<GoMail/>}
              iconStart
              style={{ borderRadius: 0, backgroundColor: "transparent" }}
            />
            <Input
              title="Mot de passe"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginInfo.password}
              handleChange={handleChange}
              icon={
                showPassword ? (
                  <BsEyeSlashFill className="text-primary hover:text-primary/90 hover:cursor-pointer" onClick={() => setShowPassword(false)} />
                ) : (
                  <BsEyeFill className="text-primary  hover:text-primary/90 hover:cursor-pointer" onClick={() => setShowPassword(true)}  />
                )
              }
              iconEnd
              style={{ borderRadius: 0, backgroundColor: "transparent" }}
            />
          </div>
          <div>
            <button
              className="bg-primary text-white w-full py-2 mt-4 text-sm hover:bg-primary/90 hover:cursor-pointer"
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress size="18px" color="inherit" />
              ) : (
                <span>connexion</span>
              )}
            </button>
            <p className="text-center hover:underline hover:cursor-pointer text-sm my-3">
              Mot de passe oublié ?
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default LoginComponent;
