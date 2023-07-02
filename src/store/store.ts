import { configureStore } from '@reduxjs/toolkit'

import notebook from './../slices/notebookSlice'
import notes from '../slices/notesSlice'
import windows from '../slices/windowsActiveManager'

const store = configureStore({
  reducer: {
    notes,
    notebook,
    windows
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store