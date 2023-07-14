import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPrivateNotifications,
  getPublicNotifications,
} from "../modules/social/services/notificationService";

export const getNotificationsPublic = createAsyncThunk(
  "data/getNotificationsPublic",
  async () => {
    try {
      const publicNotif = await getPublicNotifications();
      console.log("list public notifications data is ", publicNotif);
      return publicNotif.data;
    } catch (error) {
      console.error("public notif error is ", error);
    }
  }
);

export const getNotificationsPrivate = createAsyncThunk(
    "data/getNotificationsPrivate",
    async () => {
      try {
        const privateNotif = await getPrivateNotifications();
       console.log("list private notif data is ", privateNotif);
        return privateNotif.data;
      } catch (error) {
        console.error("private notif error is ", error);
      }
    }
  );


export const gestionNotificationSlice = createSlice({
  name: "notifData",
  initialState: {
    //membres
    unreadNotif:0,
    unreadPrivateNotif:0,
    publicNotifications: [],
    privateNotifications: [],
    publicNotifStatus: null,
    privateNotifStatus: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsPublic.pending, (state, action) => {
        state.publicNotifStatus = "loading";
      })
      .addCase(getNotificationsPublic.fulfilled, (state, action) => {
        state.publicNotifStatus = "success";
        state.publicNotifications = action.payload;
      })
      .addCase(getNotificationsPublic.rejected, (state, action) => {
        state.publicNotifStatus = "failed";
      })
       .addCase(getNotificationsPrivate.pending, (state, action) => {
        state.privateNotifStatus = "loading";
      })
      .addCase(getNotificationsPrivate.fulfilled, (state, action) => {
        state.privateNotifStatus = "success";
        state.privateNotifications = action.payload;
      })
      .addCase(getNotificationsPrivate.rejected, (state, action) => {
        state.privateNotifStatus = "failed";
      })
  },
  reducers: {
   /*  resetEvent: (state, action) => {
      state.eventError = null;
      state.eventLoading = false;
      state.eventSuccess = false;
    }, */
    addPublicNotif : (state, action) => {
      state.publicNotifications.unshift(action.payload);
    },
    addPrivateNotif:(state, action) => {
      state.privateNotifications.unshift(action.payload);
    },
    incrementUnreadNotifCount: (state, action) => {
      state.unreadNotif +=1;
    },
    
    incrementUnreadPrivateNotifCount: (state, action) => {
      state.unreadPrivateNotif +=1;
    },
    resetNotifCount: (state, action) => {
      state.unreadNotif= 0;
      state.unreadPrivateNotif=0;
    }
  },
});

 export const { addPublicNotif, addPrivateNotif, incrementUnreadNotifCount,incrementUnreadPrivateNotifCount, resetNotifCount } = gestionNotificationSlice.actions; 

export default gestionNotificationSlice.reducer;
