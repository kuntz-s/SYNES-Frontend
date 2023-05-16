import React from "react";
import teacher from "../../../assets/teacher.png"

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] w-[85%] mx-auto flex flex-col md:flex-row  items-center justify-center  md:justify-between ">
      <div className="mr-2 pl-[2px] text-center md:text-start md:basis-3/5 lg:basis-1/2">
        <p className="font-montserrat font-bold text-2xl md:text-3xl">
          <span className="text-primary">Plateforme de gestion du </span>
          <br className="hidden lg:block" />
          <span className="text-secondary">
            Syndicat National des <br className="hidden lg:block" /> Enseignants
            du Supérieur
          </span>
        </p>
        <p className="text-base md:text-xl mt-4">
          Plateforme dédiée à tous les membres du Syndicat{" "}
          <br className="hidden lg:block" />
          National des enseignants du supérieur (SYNES) afin{" "}
          <br className="hidden lg:block" />
          d’ètre à la page concernant toutes les activités{" "}
          <br className="hidden lg:block" />
          du syndicat
        </p>
        <div className="[&>*]:text-sm md:[&>*]:text-base [&>*]:py-[6px] [&>*]:font-thin [&>*]:hover:cursor-pointer mt-6 ">
          <button
            className="bg-secondary text-white px-6  border border-secondary  hover:bg-transparent hover:text-secondary mr-4 md:mr-10"
            onClick={() => navigate("/login")}
          >
            Connexion
          </button>
          <button
            className="  border border-primary  px-4 bg-transparent text-primary hover:bg-primary hover:text-white "
            onClick={() => navigate("/login")}
          >
            En savoir plus
          </button>
        </div>
      </div>
      <div className=" md:basis-2/5 lg:basis-1/2  flex  justify-center md:justify-end ml-2">
      <img src={teacher} className="scale-[0.9] lg:scale-[0.8] md:translate-y-[-3%] md:translate-x-[20%] shrink-0" alt="teacher"/>
      </div>
    </section>
  );
};

export default HeroSection;
