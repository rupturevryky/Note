import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type windowsState = {
    [key: string]: {
        active: boolean,
        notebookId: string | null,
        noteId: string | null,
    }
}

type toggleWindowAction = {
    window: string
    notebookId?: string
    noteId?: string
}

const initialState: windowsState = {
    noteItems: { active: false, notebookId: null, noteId: null},
}

export const windowsActiveManagerState = createSlice({
    name: 'windows',
    initialState,
    reducers: {
      toggleWindow: (state, action: PayloadAction<toggleWindowAction>) => { 
        state[action.payload.window].active = !state[action.payload.window].active
      }
    },
  })
  
  export const { toggleWindow } = windowsActiveManagerState.actions
  
  export default windowsActiveManagerState.reducer