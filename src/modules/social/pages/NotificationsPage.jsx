import Reac, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch,useSelector } from "react-redux";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { resetNotifCount } from "../../../redux/gestionNotificationSlice";
import { dateInFrench } from "../../../components/Constant";

const notifContainerVariants = {
  hidden: {
    width: "0px",
  },
  normal: {
    width: "400px",
  },
};

const notifList = [
  {
    id: 29,
    membre: null,
    contenu:
      "L'évènement Soutient aux professeurs en grève viens d'ètre créé, vous pouvez le consulter en allant dans la section evènement",
    envoyéLe: "2023-07-03T12:35:35",
    typeMessage: "NOUVEL EVENEMENT ",
    circonscription: "congres",
  },
  {
    id: 30,
    membre: null,
    contenu:
      "L'évènement Soutient aux professeurs en grève viens d'ètre créé, vous pouvez le consulter en allant dans la section evènement",
    envoyéLe: "2023-07-03T12:35:35",
    typeMessage: "NOUVEL EVENEMENT ",
    circonscription: "congres",
  },
  {
    id: 31,
    membre: null,
    contenu:
      "L'évènement Soutient aux professeurs en grève viens d'ètre créé, vous pouvez le consulter en allant dans la section evènement",
    envoyéLe: "2023-07-03T12:35:35",
    typeMessage: "NOUVEL EVENEMENT ",
    circonscription: "congres",
  },
];

const notifTypes = ["Public", "Privé"];

const NotificationsPage = ({ open }) => {
  const { publicNotifications, privateNotifications,unreadNotif,unreadPrivateNotif } = useSelector(
    (state) => state.gestionNotification
  );
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(notifTypes[0]);
  const [notifData, setNotifData] = useState([]);

  useEffect(() => {
    setNotifData(publicNotifications);
    setSelectedType(notifTypes[0])
  }, [publicNotifications, privateNotifications]);

  const handleChange = (type) => {
    setSelectedType(type);
    if (type === notifTypes[1]) {
      setNotifData(privateNotifications);
    } else {
      setNotifData(publicNotifications);
    }
  };

  return (
    <motion.div
      variants={notifContainerVariants}
      animate={open ? "normal" : "hidden"}
      className={`${
        open
          ? "flex bg-white shadow shadow-lg border-r border-slate-300 rounded-r-3xl absolute h-screen overflow-y-auto"
          : "hidden"
      }`}
      style={{ zIndex: 15000 }}
    >
      <div className="p-4 w-full">
        <div className="flex justify-between items-center">
        <p className="text-2xl  font-extrabold ">Notifications</p>
        <p className="text-secondary hover:underline hover:cursor-pointer text-sm pt-2" onClick={() => dispatch(resetNotifCount()) }>Marquer comme lu</p>
        </div>
        <div className="flex w-full mt-4  ">
          {notifTypes.map((type, id) => {
            return (
              <div 
              key={id}
              className="relative ">
                <p
                className={` py-[1px] px-4 mr-8 rounded-full border ${
                  selectedType === type
                    ? "border-secondary text-white bg-secondary "
                    : " text-slate-400 border-slate-400 hover:border-primary hover:text-primary hover:cursor-pointer"
                }`}
                onClick={() => handleChange(type)}
              >
                {type}
              </p>
              <span className={` ${((unreadNotif === 0 && type === notifTypes[0]) ||(unreadPrivateNotif === 0 && type === notifTypes[1]) ) && "hidden"} absolute top-[-5px] right-8 px-1 text-[12px] text-white bg-red-500  rounded-lg`}>{type === notifTypes[0]?unreadNotif:unreadPrivateNotif}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 ">
          {notifData.length === 0 ? (
            <p className="pt-16 text-center font-medium text-lg">Aucune notification pour le moment</p>
          ) : (
            notifData.map((notif) => {
              const frenchDate = dateInFrench(new Date(notif.envoyéLe));
              return (
                <div key={notif.id} className="flex py-3">
                  <div className="rounded-full bg-white text-slate-700 h-fit w-fit p-2 mr-1">
                  <BiTransfer className={`${!notif.typeMessage.includes("TRANSACTION") && "hidden"} scale-[1.6]`} />
                    <MdOutlineEventAvailable className={`${!notif.typeMessage.includes("EVENEMENT") && "hidden"} scale-[1.6]`} />
                  </div>
                  <div className="ml-1">
                    <p className="font-medium text-slate-800 text-md capitalize">
                      {notif.typeMessage}
                    </p>
                    <p className="text-md font-thin">{notif.contenu}</p>
                    <p className="text-end text-sm mt-1 italic font-light">
                      {frenchDate.jour +
                        " " +
                        frenchDate.moisPartiel +
                        " " +
                        frenchDate.année +
                        " à " +
                        frenchDate.heure.toString().padStart(2, "0") +
                        ":" +
                        frenchDate.minute.toString().padStart(2, "0")}{" "}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
