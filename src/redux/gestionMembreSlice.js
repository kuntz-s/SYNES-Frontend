import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMembers,
  createMember,
  putMemberRole,
} from "../modules/usersManagement/services/gestionMembreService";

export const getMembersList = createAsyncThunk("data/getMembers", async () => {
  try {
    const membersData = await getMembers();
    console.log("list members data is ", membersData);
    return membersData.data;
  } catch (error) {
    console.error("member error is ", error);
  }
});

export const postMember = createAsyncThunk(
  "data/postMember",
  async (memberInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createMember(memberInfo);
      console.log("member posted res is", res);
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

export const updateMemberRole = createAsyncThunk(
  "data/updateMemberRole",
  async (data, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await putMemberRole(data.memberInfo, data.restrict);
      //console.log("update member role res is", res);
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

export const gestionMembreSlice = createSlice({
  name: "membreData",
  initialState: {
    //membres
    members: [],
    membersStatus: null,
    memberLoading: false,
    memberError: null,
    memberSuccess: false,
    //update member role permissions
    updateMemRoleLoading: false,
    updateMemRoleError: null,
    updateMemRoleSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembersList.pending, (state, action) => {
        state.membersStatus = "loading";
      })
      .addCase(getMembersList.fulfilled, (state, action) => {
        state.membersStatus = "success";
        state.members = action.payload;
      })
      .addCase(getMembersList.rejected, (state, action) => {
        state.membersStatus = "failed";
      })
      .addCase(postMember.pending, (state, action) => {
        state.memberLoading = true;
        state.memberError = null;
      })
      .addCase(postMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.memberSuccess = true;
      })
      .addCase(postMember.rejected, (state, action) => {
        state.memberLoading = false;
        state.memberError = action.payload;
      })
      .addCase(updateMemberRole.pending, (state, action) => {
        state.updateMemRoleLoading = true;
        state.updateMemRoleError = null;
      })
      .addCase(updateMemberRole.fulfilled, (state, action) => {
        state.updateMemRoleLoading = false;
        state.updateMemRoleSuccess = true;
      })
      .addCase(updateMemberRole.rejected, (state, action) => {
        state.updateMemRoleLoading = false;
        state.updateMemRoleError = action.payload;
      });
  },
  reducers: {
    resetMember: (state, action) => {
      state.memberError = null;
      state.memberLoading = false;
      state.memberSuccess = false;
      state.updateMemRoleLoading = false;
      state.updateMemRoleError = null;
      state.updateMemRoleSuccess = false;
    },
  },
});

export const { resetMember } = gestionMembreSlice.actions;

export default gestionMembreSlice.reducer;
