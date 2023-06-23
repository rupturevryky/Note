import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

type Todo = {
    id: string,
    title: string,
    completed: boolean
}
type TodosState = {
  notes: Todo[]
}

const initialState: TodosState = {
  notes: [
    { id: uuidv4(), title: "start", completed: true },
    { id: uuidv4(), title: "end", completed: false }
  ]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<string>) => {
      state.notes.push({id: uuidv4(), title: action.payload, completed: false})
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