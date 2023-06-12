import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import gestionSyndicatSlice from "./gestionSyndicatSlice";
import gestionMembreSlice from "./gestionMembreSlice";

export const store =  configureStore({
    reducer: {
      user: userSlice,
      gestionSyndicat: gestionSyndicatSlice,
      gestionMembre:gestionMembreSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   