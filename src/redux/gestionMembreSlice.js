import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getMembres } from "../modules/usersManagement/services/gestionSyndicatService";

export const getMembersList = createAsyncThunk("data/getMembers", async () => {
    try {
      const membersData = await getMembres();
      //console.log("members data is ", membersData);
      return membersData.data;
    } catch (error) {
      console.error("member error is ", error);
    }
  });
  

export const gestionMembreSlice = createSlice({
    name:"membreData",
    initialState:{
        //membres
        members:[],
        membersStatus:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(getMembersList.pending, (state, action) => {
            state.membersStatus = "loading";
          })
          .addCase(getMembersList.fulfilled, (state, action) => {
            state.membersStatus = "success";
            state.members= action.payload;
          })
          .addCase(getMembersList.rejected, (state, action) => {
            state.membersStatus = "failed";
          })
    }
})

export default gestionMembreSlice.reducer;