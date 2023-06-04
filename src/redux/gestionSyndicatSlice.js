import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUniversities,
  getOrgans,
  getRoles,
  getPermissions,
  createUniversity,
  createOrgan,
  createRole,
  attributePermissions
} from "../modules/usersManagement/services/gestionSyndicatService";

export const getUniversitiesList = createAsyncThunk(
  "data/getUniversities",
  async () => {
    try {
      const universitiesData = await getUniversities();
      console.log("univ data is ", universitiesData);
      return universitiesData.data;
    } catch (error) {
      console.error("univ error is ", error);
    }
  }
);

export const getOrgansList = createAsyncThunk("data/getOrgans", async () => {
  try {
    const organsData = await getOrgans();
    console.log("organ data is ", organsData);
    return organsData.data;
  } catch (error) {
    console.error("organ error is ", error);
  }
});

export const getRolesList = createAsyncThunk("data/getRoles", async () => {
  try {
    const rolesData = await getRoles();
    console.log("roles data is ", rolesData);
    return rolesData.data;
  } catch (error) {
    console.error("roles error is ", error);
  }
});

export const getPermissionsList = createAsyncThunk("data/getPermissions", async () => {
  try {
    const permissionsData = await getPermissions();
    console.log("permissions data is ", permissionsData);
    return permissionsData.data;
  } catch (error) {
    console.error("permissions error is ", error);
  }
});




export const postUniv = createAsyncThunk(
  "data/postUniv",
  async (universityInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createUniversity(universityInfo);
      console.log("data is ", res);
      return res.data;
    } catch (error) {
      console.log("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const postOrgan = createAsyncThunk(
  "data/postOrgan",
  async (organInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createOrgan(organInfo);
      return res.data;
    } catch (error) {
      console.log("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const postRole = createAsyncThunk(
  "data/postRole",
  async (roleInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createRole(roleInfo);
      console.log("role posted res is",res)
      return res.data;
    } catch (error) {
      console.log("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePermissions = createAsyncThunk(
  "data/updatePermissions",
  async (permissionsInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await attributePermissions(permissionsInfo);
      console.log("permissions posted res is",res)
      return res.data;
    } catch (error) {
      console.log("error", error);
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const gestionSyndicatSlice = createSlice({
  name: "syndicatData",
  initialState: {
    //univesrities
    universities: [],
    universitiesStatus: null,
    univLoading: false,
    univError: null,
    univSuccess: false,

    //organs
    organs: [],
    organsStatus: null,
    organLoading: false,
    organError: null,
    organSuccess: false,

    //roles
    roles: [],
    rolesStatus: null,
    roleLoading: false,
    roleError: null,
    roleSuccess: false,


     //permissions
     permissions: [],
     permissionStatus:null,


     //update role permissions 
     updatePermLoading:false,
     updatePermError:null,
     updatePermSuccess:false
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
      })
      .addCase(getRolesList.pending, (state, action) => {
        state.rolesStatus = "loading";
      })
      .addCase(getRolesList.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.rolesStatus = "success";
      })
      .addCase(getRolesList.rejected, (state, action) => {
        state.rolesStatus = "failed";
      })
      .addCase(getPermissionsList.pending, (state, action) => {
        state.permissionStatus = "loading";
      })
      .addCase(getPermissionsList.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.permissionStatus = "success";
      })
      .addCase(getPermissionsList.rejected, (state, action) => {
        state.permissionStatus = "failed";
      })
      .addCase(postUniv.pending, (state, action) => {
        state.univLoading = true;
        state.univError = null;
      })
      .addCase(postUniv.fulfilled, (state, action) => {
        state.univLoading = false;
        state.univSuccess = true;
      })
      .addCase(postUniv.rejected, (state, action) => {
        state.univLoading = false;
        state.univError = action.payload;
      })
      .addCase(postOrgan.pending, (state, action) => {
        state.organLoading = true;
        state.organError = null;
      })
      .addCase(postOrgan.fulfilled, (state, action) => {
        state.organLoading = false;
        state.organSuccess = true;
      })
      .addCase(postOrgan.rejected, (state, action) => {
        state.organLoading = false;
        state.organError = action.payload;
      })
      .addCase(postRole.pending, (state, action) => {
        state.roleLoading = true;
        state.roleError = null;
      })
      .addCase(postRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleSuccess = true;
      })
      .addCase(postRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = action.payload;
      })
      .addCase(updatePermissions.pending, (state, action) => {
        state.updatePermLoading = true;
        state.updatePermError = null;
      })
      .addCase(updatePermissions.fulfilled, (state, action) => {
        state.updatePermLoading = false;
        state.updatePermSuccess = true;
      })
      .addCase(updatePermissions.rejected, (state, action) => {
        state.updatePermLoading = false;
        state.updatePermError = action.payload;
      })
      ;
  },
});

export default gestionSyndicatSlice.reducer;
