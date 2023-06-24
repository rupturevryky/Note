import { configureStore } from '@reduxjs/toolkit'

import notebook from './../slices/notebookSlice'
import notes from '../slices/notesSlice'

const store = configureStore({
  reducer: {
    notes,
    notebook
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store