import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSolde
} from "../modules/financeManagement/services/gestionSoldeService";

export const getSoldeBancaire = createAsyncThunk(
  "data/getSoldeBancaire",
  async () => {
    try {
      const solde = await getSolde();
      console.log("solde is  ", solde);
      return solde.data;
    } catch (error) {
      console.error("solde error is ", error);
    }
  }
);



export const gestionSoldeSlice = createSlice({
  name: "soldeData",
  initialState: {
    //membres
    unreadSolde:0,
    solde:0,
   soldeStatus: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSoldeBancaire.pending, (state, action) => {
        state.soldeStatus = "loading";
      })
      .addCase(getSoldeBancaire.fulfilled, (state, action) => {
        state.soldeStatus = "success";
        state.solde = action.payload;
      })
      .addCase(getSoldeBancaire.rejected, (state, action) => {
        state.soldeStatus = "failed";
      })
  },
  reducers: {
   
    addSolde : (state, action) => {
      state.solde= action.payload;
    },
    incrementUnreadSoldeCount: (state, action) => {
      state.unreadSolde +=1;
    },
    resetSoldeCount: (state, action) => {
      state.unreadSolde= 0;
    }
  },
});

 export const { addSolde,incrementUnreadSoldeCount, resetSoldeCount} = gestionSoldeSlice.actions; 

export default gestionSoldeSlice.reducer;
