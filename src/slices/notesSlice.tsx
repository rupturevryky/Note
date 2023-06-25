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
  nodebookId: string,
  title: string
}

type Note = {
  nodebookId: string,
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
      state[action.payload.nodebookId].push({id: uuidv1(), title: action.payload.title, completed: false})
    },
    removeNote: (state, action: PayloadAction<Note>) => { 
      state[action.payload.nodebookId] = state[action.payload.nodebookId].filter(note => note.id !== action.payload.titleId)
    },
    toggleCompleted: (state, action: PayloadAction<Note>) => { 
      const toggledTodo = state[action.payload.nodebookId].find(note => note.id === action.payload.titleId)
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    },
    addNotebookForNotesList: (state, action: PayloadAction<string>) => {
      state[action.payload] = []
    }
  },
})

export const { addNote, removeNote, toggleCompleted, addNotebookForNotesList } = notesSlice.actions

export default notesSlice.reducer