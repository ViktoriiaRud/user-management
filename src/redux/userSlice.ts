import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store';


export const fetchUsers = () => async (dispatch: AppDispatch) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch(setUsers(response.data));
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  search: string;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  search: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setUsers, setSearch } = userSlice.actions;
export default userSlice.reducer;
