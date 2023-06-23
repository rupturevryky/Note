import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 as uuidv1 } from 'uuid'

type Todo = {
    id: string,
    title: string,
    filter: 'all' | 'completed' | 'uncompleted'
}
type notebookType = {
    notebook: Todo[]
}
type actionchangeFilter = {
    id: string,
    filter: 'all' | 'completed' | 'uncompleted'
}
const initialState: notebookType = {
    notebook: [
    { id: uuidv1(), title: "start", filter: 'all' },
    { id: uuidv1(), title: "end", filter: 'all' }
  ]}

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    addNotebook: (state, action: PayloadAction<string>) => {
      state.notebook.push({id: uuidv1(), title: action.payload, filter: 'all'})
    },
    removeNotebook: (state, action: PayloadAction<string>) => { 
      state.notebook = state.notebook.filter(note => note.id !== action.payload)
    },
    changeFilter: (state, action: PayloadAction<actionchangeFilter>) => { 
      const changeTodo = state.notebook.find(note => note.id === action.payload.id)
      if (changeTodo) {
        changeTodo.filter = action.payload.filter
      }
    }
  },
})

export const { addNotebook, removeNotebook, changeFilter } = notebookSlice.actions

export default notebookSlice.reducer