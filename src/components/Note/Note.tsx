import { useState } from 'react';

import { removeNote, renameNote, toggleCompleted } from '../../slices/notesSlice';
import { useAppDispatch } from '../../store/hooks'

import s from './note.module.scss'
interface NoteProps{
    notebookId: string,
    noteId: string,
    noteTitle: string,
    completed: boolean
}

const Note: React.FC<NoteProps> = ({ notebookId, noteId, noteTitle, completed }) => {

    const dispatch = useAppDispatch()
    const [noteNameInputActive, setNoteNameInputActive] = useState(false)
    const [noteName, setNoteName] = useState(noteTitle)
    
    const onChangeCheckboxHandler = (nodebookId: string, noteId: string) => {
        const action = { nodebookId: nodebookId, noteId: noteId }
        dispatch(toggleCompleted(action))
    }
    const onDeleteHandler = (nodebookId: string, noteId: string) => {
        const action = { nodebookId: nodebookId, noteId: noteId }
        dispatch(removeNote(action))
    }
    const renameNoteTitle = (key?: string) => {
        if (key) {
            if (key === "Enter" && noteName.trim() !== '' && noteName !== noteTitle) {
                dispatch(renameNote({ notebookId: notebookId, noteId: noteId, newNoteName: noteName }))    // меняет title в state.notebook
                setNoteNameInputActive(false)
            } else if (key === "Enter" && noteName.trim() !== '') {                        // менять title в state.notebook бессмысленно, ведь он не изменился
                setNoteNameInputActive(false)
            } else if (key === "Enter" && noteName.trim() === '') {                        // пустое поле возвращается на нормальное со значением из state
                setNoteName(noteTitle)
                setNoteNameInputActive(false)
            }
        } else {                                                                            // в onBlur функция renameStateTitle проискодит без key
            if (noteName.trim() !== '' && noteName !== noteTitle) {
                dispatch(renameNote({ notebookId: notebookId, noteId: noteId, newNoteName: noteName }))    // аналогично верхней части
                setNoteNameInputActive(false)
            } else if (noteName.trim() !== '') {
                setNoteNameInputActive(false)
            } else if (noteName.trim() === '') {
                setNoteName(noteTitle)
                setNoteNameInputActive(false)
            }
        }
    }
    const noteNameBlock = noteNameInputActive
        ? <input value={noteName}
            onChange={e => setNoteName(e.target.value)}
            onKeyDown={e => renameNoteTitle(e.key)}
            onBlur={() => renameNoteTitle()}
            autoFocus/>
        : <p onDoubleClick={() => setNoteNameInputActive(true)}>{noteName}</p>
    
    return (
        <li className={s.li}>
            <input type="checkbox" name="checkbox" checked={completed}
                onChange={() => onChangeCheckboxHandler(notebookId, noteId)}/>
            {noteNameBlock}
            <button onClick={() => onDeleteHandler(notebookId, noteId)}>Delete note</button>
        </li>  
    )
}

export default Note;