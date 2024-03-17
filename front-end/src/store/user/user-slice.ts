import { createSlice } from "@reduxjs/toolkit"

export interface IUser { }

const initialState: IUser = {}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
})

export default UserSlice.reducer
