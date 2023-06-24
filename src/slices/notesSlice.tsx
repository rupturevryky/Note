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

type AddNote = {
  noteId: string,
  title: string
}

type Note = {
  noteId: string,
  titleId: string
}

const initialState: TodosState = {
  '1': [
    { id: uuidv1(), title: "first note", completed: true },
    { id: uuidv1(), title: "second note", completed: false }
  ]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNote>) => {
      state[action.payload.noteId].push({id: uuidv1(), title: action.payload.title, completed: false})
    },
    removeNote: (state, action: PayloadAction<Note>) => { 
      state[action.payload.noteId] = state[action.payload.noteId].filter(note => note.id !== action.payload.titleId)
    },
    toggleCompleted: (state, action: PayloadAction<Note>) => { 
      const toggledTodo = state[action.payload.noteId].find(note => note.id === action.payload.titleId)
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    }
  },
})

export const { addNote, removeNote, toggleCompleted } = notesSlice.actions

export default notesSlice.reducer