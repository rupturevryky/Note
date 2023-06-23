import { configureStore } from '@reduxjs/toolkit'

import notesSlice from '../slices/notesSlice'

const store = configureStore({
  reducer: {
    notesSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store