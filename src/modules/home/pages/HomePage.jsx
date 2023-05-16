import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Helmet from "../../../components/Helmet/Helmet";
import Navbar from "../../../layout/navbar/Navbar";
import Footer from "../../../layout/footer/Footer";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <HelmetProvider>
      <Helmet title="Synes-Accueil" description="page d'accueil du synes" />
      <section className="min-h-screen bg-homeBackground bg-no-repeat bg-cover">
        <Navbar />
        <HeroSection />
        <Footer />
      </section>
    </HelmetProvider>
  );
};

export default HomePage;
