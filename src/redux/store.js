import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import gestionSyndicatSlice from "./gestionSyndicatSlice";

export const store =  configureStore({
    reducer: {
      user: userSlice,
      gestionSyndicat: gestionSyndicatSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
   