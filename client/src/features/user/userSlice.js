import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    loginStart: (state) => {
        state.loading = true;
        console.log('login start');
    },

    loginSuccess: (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
    },

    loginFail: (state) => {
        state.loading = false;
        state.error = true;
        console.log('login fial');
    },

    logout: (state) => {
        state.user = null;
        state.loading = false;
        state.error = false;
    },

    subscription: (state,action) => {
      if(state.user.subScribedUsers.includes(action.payload)) {
        state.user.subScribedUsers.splice(state.user.subScribedUsers.findIndex((channelId) => channelId === action.payload), 1);
      } else {
        state.user.subScribedUsers.push(action.payload);
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail, logout, subscription  } = userSlice.actions

export default userSlice.reducer