import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getListeEvenements } from "../../../redux/gestionEvenementSlice";
import Helmet from "../../../components/Helmet/Helmet";
import EventsDisplay from "../components/EventsDisplay";
import NoEvent from "../components/NoEvent";



const EventsPage = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.gestionEvenement);

  useEffect(() => {
    dispatch(getListeEvenements());
  }, []);
  console.log("event is ", events);
  return (
    <HelmetProvider>
      <Helmet
        title="Synes-Evènements"
        description="page des évènements du synes"
      />
      <section className="p-4 md:p-8">
        <div className="text-center">
          <p className=" text-3xl font-extrabold text-secondary">
            Evènements du synes
          </p>
          <p className=" mt-1 text-lg text-slate-600 ">
            Liste des évènements du SYNES avec les différentes participations de
            chaque membre
          </p>
        </div>
        <div>
          {events.length === 0 ? (
            <NoEvent/>
          ) : (
            <EventsDisplay events={events}/>
          )}
        </div>
      </section>
    </HelmetProvider>
  );
};

export default EventsPage;
