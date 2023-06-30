import React, { useState } from "react";
import { compareAsc } from "date-fns";
import {BsCalendar2,BsPersonCircle} from "react-icons/bs";
import { dateInFrench } from "../../../components/Constant";
import event from "../../../assets/img/event.svg";
import event1 from "../../../assets/img/event1.jpg";
import event2 from "../../../assets/img/event2.jpg";

const imgList = [
  {
    id: 0,
    img: event,
  },
  {
    id: 1,
    img: event1,
  },
  {
    id: 2,
    img: event2,
  },
];

const filterOptions = [
  "Tout",
  "Cette semaine",
  "Ce mois-ci",
  "Ce semestre",
  "Cette année",
];

const EventsDisplay = ({ events }) => {
  const [option, setOption] = useState({ period: "Tout", active: null });
  return (
    <div className="mt-8">
      <div className="flex [&>*]:mr-1 md:[&>*]:mr-4 overflow-hidden flex-wrap">
        {filterOptions.map((opt, id) => {
          return (
            <p
              key={id}
              className={`rounded-md px-4 py-2 ${
                opt === option.period
                  ? "text-primary font-medium bg-slate-100 "
                  : "text-slate-600 hover:cursor-pointer hover:text-primary"
              }`}
              onClick={() => setOption({ ...option, period: opt })}
            >
              {opt}
            </p>
          );
        })}
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {events.map((event) => {
            const startDate = dateInFrench(new Date(event.dateDebut));
            const endDate = dateInFrench(new Date(event.dateFin));
            const isOpen = compareAsc(new Date(), new Date(event.dateFin)); //si 1 alors la première date est après la seconde ,-1 sinon , 0 si la mm 
          return (
            <div key={event.id} className={`mt-2 border border-slate-100 shadow-sm rounded-md p-2 hover:shadow-md hover:cursor-pointer`}>
              <img
                src={imgList[parseInt(event.photo)].img}
                alt="event illustration"
                className="max-w-full h-[150px] mx-auto"
              />
              <div className="mt-1">
              <p className="text-md font-medium capitalize">{event.nom}</p>
              <div className="mt-1 flex items-center">
                <BsCalendar2 className="mr-2 text-primary"/> <span className="font-light text-sm translate-y-[1px]">{startDate.jour +" "+startDate.moisPartiel+ " " + startDate.année} - {endDate.jour +" "+endDate.moisPartiel+ " " + endDate.année}</span>
            </div>
            <div className="mt-2 flex items-center">
                <BsPersonCircle className="mr-2 text-slate-700 text-lg"/> <span className="font-light italic text-sm translate-y-[1px]">3 personnes ont contribué</span>
            </div>
           <p className="mt-2 text-sm"> <span className="text-slate-700 mr-1">Statut: </span>  <span className={`  py-[2px] px-3 w-fit rounded-md ${isOpen !== -1 ? "bg-red-100 text-red-600":"bg-green-50 text-green-500"}`}>{isOpen !== -1?"Fermé":"Ouvert"}</span></p>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsDisplay;
