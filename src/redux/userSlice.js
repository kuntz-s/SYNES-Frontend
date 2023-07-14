import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticateUser } from "../modules/authentication/service/authService";

/**login user */
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const { data } = await authenticateUser({ email, password });
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo",JSON.stringify(data))
      return data;
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



const initialState = {
  loading: false,
  userInfo: {}, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser:(state,action) =>{
        state.userInfo = {};
        state.error= null;
        state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      //login user
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
