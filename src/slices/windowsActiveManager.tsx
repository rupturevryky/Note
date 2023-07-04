import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type windowsState = {
    [key: string]: {
        active: boolean,
        notebookId: string,
        noteId: string,
    }
}

type toggleWindowAction = {
  window: string
  notebookId: string
  noteId: string
}

const initialState: windowsState = {
    noteItems: { active: false, notebookId: 'null', noteId: 'null'},
}

export const windowsActiveManagerState = createSlice({
    name: 'windows',
    initialState,
    reducers: {
      toggleWindow: (state, action: PayloadAction<toggleWindowAction>) => { 
        state[action.payload.window].active = !state[action.payload.window].active
        if (state[action.payload.window].active === true) {
          state[action.payload.window].notebookId = action.payload.notebookId
          state[action.payload.window].noteId = action.payload.noteId
        } else {
          state[action.payload.window].notebookId = 'null'
          state[action.payload.window].noteId = 'null'
        }
        
      }
    },
  })
  
  export const { toggleWindow } = windowsActiveManagerState.actions
  
  export default windowsActiveManagerState.reducer