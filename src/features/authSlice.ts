import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  displayName: string
  email: string
  photoUrl: string
  uid: string
}

export interface StateType {
  user: User | null
}

export const authReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const userActions = authReducer.actions

export const selectUser = (state: StateType) => state.user

export default authReducer.reducer
