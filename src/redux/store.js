import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import gestionSyndicatSlice from "./gestionSyndicatSlice";
import gestionMembreSlice from "./gestionMembreSlice";
import gestionEvenementSlice from "./gestionEvenementSlice";
import gestionTransactionSlice from "./gestionTransactionSlice";
import gestionNotificationSlice from "./gestionNotificationSlice";
import gestionSoldeSlice from "./gestionSoldeSlice";

export const store =  configureStore({
    reducer: {
      user: userSlice,
      gestionSyndicat: gestionSyndicatSlice,
      gestionMembre:gestionMembreSlice,
      gestionEvenement:gestionEvenementSlice,
      gestionTransaction:gestionTransactionSlice,
      gestionNotification:gestionNotificationSlice,
      gestionSolde: gestionSoldeSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   