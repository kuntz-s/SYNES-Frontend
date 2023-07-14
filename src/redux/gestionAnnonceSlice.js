import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getListAnnonce
} from "../modules/social/services/annonceService";

export const getAnnonces = createAsyncThunk(
  "data/getAnnonces",
  async () => {
    try {
      const annonces = await getListAnnonce();
      console.log("annonces data is  ", annonces);
      return annonces.data;
    } catch (error) {
      console.error("annonces error is ", error);
    }
  }
);



export const getAnnonceSlice = createSlice({
  name: "annonceData",
  initialState: {
    annoncesList:[],
   annonceStatus: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnnonces.pending, (state, action) => {
        state.annonceStatus = "loading";
      })
      .addCase(getAnnonces.fulfilled, (state, action) => {
        state.annonceStatus = "success";
        state.annoncesList = action.payload;
      })
      .addCase(getAnnonces.rejected, (state, action) => {
        state.annonceStatus = "failed";
      })
  },
});

export default getAnnonceSlice.reducer;
