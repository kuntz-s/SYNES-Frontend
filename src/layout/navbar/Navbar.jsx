import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {toast, ToastContainer} from "react-toastify";
import { logoutUser } from '../../redux/userSlice';
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo");
  const handleLogout =() => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
    toast.success("deconnexion réussie");
    setTimeout(() => {
      navigate(0);
    },2000)
  }
  return (
   <>
    <section className='flex justify-between items-center w-[85%] mx-auto bg-transparent py-2'>
      <img src={logo} className='w-[60px] h-[60px] hover:cursor-pointer' alt="logo" onClick={() => navigate("/")}/>
      <button className='bg-primary text-sm text-white py-[6px] px-4 font-thin border border-primary hover:cursor-pointer hover:bg-transparent hover:text-primary' onClick={() => {userInfo? handleLogout():navigate("/login")}}>{userInfo ? "Deconnexion":"Connexion"}</button>
    </section>
       <ToastContainer/></>
  )
}

export default Navbar