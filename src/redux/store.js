import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import gestionSyndicatSlice from "./gestionSyndicatSlice";
import gestionMembreSlice from "./gestionMembreSlice";
import gestionEvenementSlice from "./gestionEvenementSlice"

export const store =  configureStore({
    reducer: {
      user: userSlice,
      gestionSyndicat: gestionSyndicatSlice,
      gestionMembre:gestionMembreSlice,
      gestionEvenement:gestionEvenementSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   