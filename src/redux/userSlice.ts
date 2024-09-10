import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.filteredUsers = state.users.filter(user => {
        return Object.entries(action.payload).every(([key, value]) => {
          const userValue = user[key as keyof User];
          if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(value.toLowerCase());
          } else if (typeof userValue === 'number') {
            return userValue.toString().includes(value);
          }
          return false;
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});


export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;