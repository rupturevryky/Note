import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 as uuidv1 } from 'uuid';

type Todo = {
    id: string,
    title: string,
    completed: boolean
}

type TodosState = {
  [key: string]: Todo[]
}

const initialState: TodosState = {
  [uuidv1()]: [
    { id: uuidv1(), title: "start", completed: true },
    { id: uuidv1(), title: "end", completed: false }
  ]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<string>) => {
      state.notes.push({id: uuidv1(), title: action.payload, completed: false})
    },
    removeNote: (state, action: PayloadAction<string>) => { 
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    toggleCompleted: (state, action: PayloadAction<string>) => { 
      const toggledTodo = state.notes.find(note => note.id === action.payload)
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    }
  },
})

export const { addNote, removeNote, toggleCompleted } = notesSlice.actions

export default notesSlice.reducer