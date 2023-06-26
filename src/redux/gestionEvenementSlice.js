import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEvenements,
  createEvenement,
} from "../modules/financeManagement/services/gestionEvenementService";

export const getListeEvenements = createAsyncThunk(
  "data/getListeEvenements",
  async () => {
    try {
      const eventsData = await getEvenements();
      console.log("list evenements data is ", eventsData);
      return eventsData.data;
    } catch (error) {
      console.error("member error is ", error);
    }
  }
);

export const postEvenement = createAsyncThunk(
  "data/postEvenement",
  async (eventInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createEvenement(eventInfo);
      console.log("event posted res is", res);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const gestionEvenementSlice = createSlice({
  name: "eventData",
  initialState: {
    //membres
    events: [],
    eventStatus: null,
    eventLoading: false,
    eventError: null,
    eventSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListeEvenements.pending, (state, action) => {
        state.eventStatus = "loading";
      })
      .addCase(getListeEvenements.fulfilled, (state, action) => {
        state.eventStatus = "success";
        state.events = action.payload;
      })
      .addCase(getListeEvenements.rejected, (state, action) => {
        state.eventStatus = "failed";
      })
      .addCase(postEvenement.pending, (state, action) => {
        state.eventLoading = true;
        state.eventError = null;
      })
      .addCase(postEvenement.fulfilled, (state, action) => {
        state.eventLoading = false;
        state.eventSuccess = true;
      })
      .addCase(postEvenement.rejected, (state, action) => {
        state.eventLoading = false;
        state.eventError = action.payload;
      });
  },
  reducers: {
    resetEvent: (state, action) => {
      state.eventError = null;
      state.eventLoading = false;
      state.eventSuccess = false;
    },
  },
});

export const { resetEvent } = gestionEvenementSlice.actions;

export default gestionEvenementSlice.reducer;
