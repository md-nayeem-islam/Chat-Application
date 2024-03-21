import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null ,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state,action) => {
      state.value = action.payload
    },
  },
})

export const {loginUser } = userSlice.actions

export default userSlice.reducer