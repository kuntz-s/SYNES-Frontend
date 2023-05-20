import React from 'react';
import { HelmetProvider } from "react-helmet-async";
import Helmet from "../../../components/Helmet/Helmet";
import LoginComponent from "../components/LoginComponent";

const LoginPage = () => {
  return (
    <HelmetProvider>
      <Helmet title="Synes-Connexion" description="page de connexion du synes" />
      <LoginComponent/>
    </HelmetProvider>
  )
}

export default LoginPage