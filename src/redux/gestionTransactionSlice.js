import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTransactions,
  createTransaction,
} from "../modules/financeManagement/services/gestionTransactionService";

export const getListeTransactions = createAsyncThunk(
  "data/getListeTransactions",
  async () => {
    try {
      const transactions = await getTransactions();
      console.log("list transactions data are ", transactions);
      return transactions.data;
    } catch (error) {
      console.error("transaction error is ", error);
    }
  }
);

export const postTransaction = createAsyncThunk(
  "data/postTransaction",
  async (transactionInfo, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const res = await createTransaction(transactionInfo);
      console.log("transaction posted res is", res);
      return res.data;
    } catch (error) {
      console.log("error is ",error)
      // return custom error message from API if any
      if (error.response && error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const gestionTransactionSlice = createSlice({
  name: "transactionData",
  initialState: {
    //transactions
    transactions: [],
    transactionStatus: null,
    transactionLoading: false,
    transactionError: null,
    transactionSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListeTransactions.pending, (state, action) => {
        state.transactionStatus = "loading";
      })
      .addCase(getListeTransactions.fulfilled, (state, action) => {
        state.transactionStatus = "success";
        state.transactions = action.payload;
      })
      .addCase(getListeTransactions.rejected, (state, action) => {
        state.transactionStatus = "failed";
      })
      .addCase(postTransaction.pending, (state, action) => {
        state.transactionLoading = true;
        state.transactionError = null;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.transactionSuccess = true;
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = action.payload;
      });
  },
  reducers: {
    resetTransaction: (state, action) => {
      state.transactionError = null;
      state.transactionLoading = false;
      state.transactionSuccess = false;
    },
  },
});

export const { resetTransaction } = gestionTransactionSlice.actions;

export default gestionTransactionSlice.reducer;
