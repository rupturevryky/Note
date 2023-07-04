import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 as uuidv1 } from 'uuid';

type Todo = {
  id: string
  title: string
  description: string
  details: string
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
  notebookId: string,
  noteId: string
}
type actionEditNote = {
  notebookId: string,
  noteId: string,
  title: string
  description: string
  details: string
}

const initialState: TodosState = {
  '1': [
    { id: uuidv1(), title: "first note", description: 'first description', details: 'first description', completed: true },
    { id: uuidv1(), title: "second note",  description: '', details: '', completed: false }
  ]
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNote>) => {
      state[action.payload.nodebookId].push({id: uuidv1(), title: action.payload.title, completed: false, description: '', details: ''})
    },
    removeNote: (state, action: PayloadAction<Note>) => { 
      state[action.payload.notebookId] = state[action.payload.notebookId].filter(note => note.id !== action.payload.noteId)
    },
    toggleCompleted: (state, action: PayloadAction<Note>) => { 
      const toggledTodo = state[action.payload.notebookId].find(note => note.id === action.payload.noteId)
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    },
    addNotebookForNotesList: (state, action: PayloadAction<string>) => {
      state[action.payload] = []
    },
    edit: (state, action: PayloadAction<actionEditNote>) => {
      const myNote = state[action.payload.notebookId].find(note => note.id === action.payload.noteId)
      if (myNote) {
        myNote.title = action.payload.title
        myNote.description = action.payload.description
        myNote.details = action.payload.details
      }
    }, 
    removeNoteKey: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    }
  },
})

export const { addNote, removeNote, toggleCompleted, addNotebookForNotesList, edit, removeNoteKey } = notesSlice.actions

export default notesSlice.reducer