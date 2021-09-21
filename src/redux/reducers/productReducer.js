import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProduct, loadmore, paginations, searchProductByName } from '../../services';

const initialState = {
  value: 0,
  isloading: false,
  listCart :[],
  listProducts: [],
}

// First, create the thunk
export const GETPRODUCT = createAsyncThunk (
  'users/fetchByIdStatus',
  async () => {
    const response = await getProduct();
    return response.data;
  }
);
export const SEARCHPRODUCT = createAsyncThunk (
  'users/fetchByIdStatus',
  async (params) => {
    const response = await searchProductByName(params);
    return response.data;
  }
);

export const PAGINATIONS = createAsyncThunk (
  'users/fetchByIdStatus',
  async (params) => {
    const response = await paginations(params);
    return response.data;
  }
);
export const LOAD_MORE = createAsyncThunk (
  'users/fetchByIdStatus',
  async (params) => {
    const response = await loadmore(params);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addCart (state, action) {
      state.listCart = [...state.listCart, action.payload];
      console.log(state.listCart)
    },
    deletedCart (state, action) {
      state.listCart = state.listCart.filter (
        listCart => listCart._id !== action.payload
      );
    },
    // deletedProduct (state, action) {
    //   state.listProducts = state.listProducts.filter (
    //     listProducts => listProducts._id !== action.payload
    //   );
    // },
    ADD_PRODUCT (state, action) {
      // console.log(action.payload)
      state.listProducts = [action.payload,...state.listProducts];
    },
    DELETE_PRODUCT (state, action) {
      // console.log(action.payload)
      state.listProducts = state.listProducts.filter (
        listProducts => listProducts._id !== action.payload
      );
    },
    EDIT_PRODUCT(state, action){
        // state.listProducts = [action.payload,...state.listProducts];
        console.log(action.payload);
    }
  },
  extraReducers: {
    [GETPRODUCT.pending]: state => {
      // trong trạng thái đợi thực thi
      state.isloading = true;
    },
    [GETPRODUCT.fulfilled]: (state, action) => {
      state.isloading = false;
      state.listProducts = action.payload;
    },
    [GETPRODUCT.rejected]: (state, action) => {
      state.isloading = false;
      // console.log('that bai');
      state.error = action.payload;
    },
    [SEARCHPRODUCT.pending]: state => {
      // trong trạng thái đợi thực thi
      state.isloading = true;
    },
    [SEARCHPRODUCT.fulfilled]: (state, action) => {
      state.isloading = false;
      // console.log (action.payload);
      state.listProducts = action.payload;
    },
    [SEARCHPRODUCT.rejected]: (state, action) => {
      state.isloading = false;
    },
    [PAGINATIONS.pending]: state => {
      // trong trạng thái đợi thực thi
      state.isloading = true;
    },
    [PAGINATIONS.fulfilled]: (state, action) => {
      state.isloading = false;
      state.listProducts = action.payload;
      // console.log('abc', state.listProducts)
      // console.log('thành công')
    },
    [PAGINATIONS.rejected]: (state, action) => {
      state.isloading = false;
      // console.log("that bai");
      state.error = action.payload;
    },
    [LOAD_MORE.pending]: state => {
      // trong trạng thái đợi thực thi
      state.isloading = true;
    },
    [LOAD_MORE.fulfilled]: (state, action) => {
      state.isloading = false;
      state.listProducts = state.listProducts.concat(action.payload);
      // console.log('abc', action.payload)
      // console.log("listProducts", state.listProducts)
    },
    [LOAD_MORE.rejected]: (state, action) => {
      state.isloading = false;
      // console.log("that bai");
      state.error = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function

export const {addCart, deletedCart,ADD_PRODUCT,DELETE_PRODUCT, EDIT_PRODUCT} = productSlice.actions;
const {reducer: productReducer} = productSlice;
export default productReducer;