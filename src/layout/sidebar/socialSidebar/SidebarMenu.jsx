import "../../../components/init";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Sidebar from "./Sidebar";
import {
  getNotificationsPrivate,
  getNotificationsPublic,
  addPublicNotif,
  addPrivateNotif,
  incrementUnreadNotifCount,
  incrementUnreadPrivateNotifCount,
} from "../../../redux/gestionNotificationSlice";
import { getListeTransactions } from "../../../redux/gestionTransactionSlice";
import { incrementUnreadSoldeCount, addSolde } from "../../../redux/gestionSoldeSlice";
import NotificationsPage from "../../../modules/social/pages/NotificationsPage";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;
var stompClient = null;
const SidebarMenu = () => {
  const smScreen = useMediaQuery("(max-width:767px)");
  const mdScreen = useMediaQuery("(min-width:768px)");
  const lgScreen = useMediaQuery("(min-width:1024px)");
  const dispatch = useDispatch();
  const { publicNotifications, privateNotifications } = useSelector(
    (state) => state.gestionNotification
  );
  const [openNotif, setOpenNotif] = useState(false);
  const [shrink, setShrink] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const connect = () => {
    const socket = new SockJS(rootLink + "/stomp-endpoint");
    // Create a STOMP client
    stompClient = Stomp.over(socket);
    // Set up STOMP client
    stompClient.connect({}, onConnected, () => {
      console.log("il y'a une erreur");
    });
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/topic/sendNotification",
      onPublicNotificationReceived
    );
    stompClient.subscribe(
      "/specific/" + user.membre.id,
      onPrivateNotificationReceived
    );
    stompClient.subscribe(
      "/topic/solde",
      onSoldeReceive
    )
  };

  const onPublicNotificationReceived = (payload) => {
    const parsedRes = JSON.parse(payload.body);
    const verify = publicNotifications.find((elt) => elt.id === parsedRes.id);
    if (!verify) {
      dispatch(incrementUnreadNotifCount());
      dispatch(addPublicNotif(parsedRes));
    }
  };

  const onPrivateNotificationReceived = (payload) => {
    const parsedRes = JSON.parse(payload.body);
    const verify = privateNotifications.find((elt) => elt.id === parsedRes.id);
    if (!verify) {
      dispatch(incrementUnreadPrivateNotifCount());
      dispatch(addPrivateNotif(parsedRes));
    }
  };

  const onSoldeReceive = (payload) =>{
    const newSolde = parseInt(payload.body);
    dispatch(addSolde(newSolde));
    dispatch(incrementUnreadSoldeCount());
    dispatch(getListeTransactions())
  }

  useEffect(() => {
    dispatch(getNotificationsPublic());
    dispatch(getNotificationsPrivate());
    connect();
  }, []);

  return (
    <section className="flex min-h-screen relative">
      <Sidebar
        smScreen={smScreen}
        mdScreen={mdScreen}
        lgScreen={lgScreen}
        shrink={shrink}
        openNotif={openNotif}
        handleOpen={() => {
          setOpenNotif(true);
          setShrink(true);
        }}
        handleClose={() => {
          setOpenNotif(false);
          setShrink(false);
        }}
      />
      <div className="w-full ">
        <div className={`${!openNotif && "hidden"}`}>
          <NotificationsPage open={openNotif} />
        </div>
        <div
          className="w-full"
          onClick={() => {
            setOpenNotif(false);
            setShrink(false);
          }}
        >
          <Outlet />
        </div>
      </div>
      {/* 
      <BottomSidebar/> */}
    </section>
  );
};

export default SidebarMenu;
