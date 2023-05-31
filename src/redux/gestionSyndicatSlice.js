import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUniversities, getOrgans } from "../modules/usersManagement/services/gestionSyndicatService";

export const getUniversitiesList = createAsyncThunk(
  "data/getUniversities",
  async () => {
    try {

      const universitiesData = await getUniversities()
      console.log("univ data is ", universitiesData);
      return universitiesData.data;
    } catch (error) {
      console.error("univ error is ", error);
    }
  }
);

export const getOrgansList = createAsyncThunk(
  "data/getOrgans",
  async () => {
    try {

      const organsData = await getOrgans()
      console.log("organ data is ", organsData);
      return organsData.data;
    } catch (error) {
      console.error("organ error is ", error);
    }
  }
);

export const gestionSyndicatSlice = createSlice({
  name: "syndicatData",
  initialState: {
    universities: [],
    universitiesStatus: null,
    organs:[],
    organsStatus:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUniversitiesList.pending, (state, action) => {
        state.universitiesStatus = "loading";
      })
      .addCase(getUniversitiesList.fulfilled, (state, action) => {
        state.universities = action.payload;
        state.universitiesStatus = "success";
      })
      .addCase(getUniversitiesList.rejected, (state, action) => {
        state.universitiesStatus = "failed";
      })
      .addCase(getOrgansList.pending, (state, action) => {
        state.organsStatus = "loading";
      })
      .addCase(getOrgansList.fulfilled, (state, action) => {
        state.organs = action.payload;
        state.organsStatus = "success";
      })
      .addCase(getOrgansList.rejected, (state, action) => {
        state.organsStatus = "failed";
      });
  },
});

export default gestionSyndicatSlice.reducer;
