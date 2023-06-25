import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Todo = {
    id: string,
    title: string,
    filter: 'all' | 'completed' | 'uncompleted'
}
type notebookType = {
    notebook: Todo[]
}
type actionChangeFilter = {
    id: string,
    filter: 'all' | 'completed' | 'uncompleted'
}
const initialState: notebookType = {
    notebook: [
    { id: '1', title: "start", filter: 'all' },
  ]}

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    addNotebook: (state, action: PayloadAction<string>) => {
      state.notebook.unshift({id: action.payload, title: "New notebook", filter: 'all'})
    },
    removeNotebook: (state, action: PayloadAction<string>) => { 
      state.notebook = state.notebook.filter(note => note.id !== action.payload)
    },
    changeFilter: (state, action: PayloadAction<actionChangeFilter>) => { 
      const changeTodo = state.notebook.find(note => note.id === action.payload.id)
      if (changeTodo) {
        changeTodo.filter = action.payload.filter
      }
    }
  },
})

export const { addNotebook, removeNotebook, changeFilter } = notebookSlice.actions

export default notebookSlice.reducer