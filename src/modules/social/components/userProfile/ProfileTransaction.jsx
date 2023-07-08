import React from "react";
import { BsCash, BsArrowDownUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import event from "../../../../assets/img/event.svg";
import event1 from "../../../../assets/img/event1.jpg";
import event2 from "../../../../assets/img/event2.jpg";

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

const ProfileTransaction = ({ data }) => {
  const { privateNotifications } = useSelector(
    (state) => state.gestionNotification
  );
  console.log(privateNotifications);
  return (
    <section className="w-full">
      {data.transactionList.length === 0 ? (
        <div className="h-[20vh] flex flex-col justify-center items-center">
          <p className="text-lg">Aucune transaction publiée pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-4">
          {data.transactionList.map((trans, id) => {
            return (
              <div
                key={id}
                className=" border border-slate-100 shadow-sm rounded-md p-2"
              >
                <img
                  src={imgList[parseInt(trans.evenements.photo)].img}
                  alt="event illustration"
                  className="max-w-full h-[150px] mx-auto"
                />
                <p className="capitalize font-medium">{trans.evenements.nom}</p>
                <p className="flex items-center">
                  <BsCash className="mr-2" /> <span>{trans.montant}</span>
                </p>
                <p className="flex items-center">
                  <BsArrowDownUp className="mr-2" />{" "}
                  <span
                    className={` capitalize ${
                      trans.type === "ajout" ? "text-green-700" : "text-red-400"
                    }`}
                  >
                    {trans.type}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProfileTransaction;
