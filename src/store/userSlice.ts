import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../api/userApi';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}


interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsersApi();
  return response;
});


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});


export default userSlice.reducer;
