import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { authentication } from '../../services';
import {setToken} from '../../utils/utils'

// First, create the thunk
export const AUTHENTICATION = createAsyncThunk (
    'users/fetchByIdStatus',
    async (params) => {
      const response = await authentication(params);
      return response.data;
    }
  );

// Then, handle actions in your reducers:
const authenSlice = createSlice ({
  name: 'authentication',
  initialState: {isloading : false},

  extraReducers: {
    [AUTHENTICATION.pending]: state => {
      // trong trạng thái đợi thực thi
      state.isloading = true;
    //   console.log('pending', state);
    },
    [AUTHENTICATION.fulfilled]: (state, action) => {
      state.isloading = false;
    //   state.listProducts = action.payload;
    //   console.log('abc', action.payload)
      setToken(action.payload.accessToken)
    },
    [AUTHENTICATION.rejected]: (state, action) => {
      state.isloading = false;
    //   console.log('thất bại')
      state.error = action.payload;
    }
  },
});

export const {} = authenSlice.actions;
const {reducer: authenReducer} = authenSlice;
export default authenReducer;
