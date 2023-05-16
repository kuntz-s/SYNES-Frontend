import React from 'react';
import { useNavigate } from 'react-router';
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate =  useNavigate();
  return (
    <section className='flex justify-between items-center w-[85%] mx-auto bg-transparent py-2'>
      <img src={logo} className='w-[60px] h-[60px] hover:cursor-pointer' alt="logo" onClick={() => navigate("/")}/>
      <button className='bg-primary text-sm text-white py-[6px] px-4 font-thin border border-primary hover:cursor-pointer hover:bg-transparent hover:text-primary' onClick={() => navigate("/login")}>Connexion</button>
    </section>
  )
}

export default Navbar