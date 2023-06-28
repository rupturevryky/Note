import { useState } from 'react';

import { removeNote, renameNote, toggleCompleted } from '../../slices/notesSlice';
import { useAppDispatch } from '../../store/hooks'

import s from './note.module.scss'
interface NoteProps{
    notebookId: string,
    noteId: string,
    noteTitle: string,
    completed: boolean,
    place: number,
}

const Note: React.FC<NoteProps> = ({ notebookId, noteId, noteTitle, completed, place }) => {

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
    const renameNoteTitle = (key: string) => {
            if (key === "Enter" && noteName.trim() !== '' && noteName !== noteTitle) {
                dispatch(renameNote({ notebookId: notebookId, noteId: noteId, newNoteName: noteName }))    // меняет title в state.notebook
                setNoteNameInputActive(false)
            } else if (key === "Enter" && noteName.trim() !== '') {                        // менять title в state.notebook бессмысленно, ведь он не изменился
                setNoteNameInputActive(false)
            } else if (key === "Enter" && noteName.trim() === '') {                        // пустое поле возвращается на нормальное со значением из state
                setNoteName(noteTitle)
                setNoteNameInputActive(false)
            }
    }

    const activateNoteForm = (e: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setNoteNameInputActive(true)
        }
    }

    const changeNoteInputValue = (value: string) => {
        if (noteName.length < 25 || value.length < noteName.length) {
            setNoteName(value)
        }
    }
    const NoteInputLimit = () => noteName.length > 19 ? `Осталось ${25 - noteName.length} символов` : null
    const NoteInputLimitStyle = () => {
        if (noteName.length === 25) {
            return {color: 'red'}
        }
        if (noteName.length > 19) {
            return {color: 'orange'}
        }
    }
    const NoteInputStyle = () => {
        let width = 150
        if (noteName.length * 10 > width) {
            width = noteName.length * 10
        }
        return {width: `${width}px`}
    }

    const textStyle = () => completed ? `${s.title} ${s.completedTitle} ${s.completedColor}` : `${s.title}`
    
    const noteNameBlock = noteNameInputActive
        ?   <div className={s.NoteTitleForm}>
            <input
                style={NoteInputStyle()}
                value={noteName}
                onChange={e => changeNoteInputValue(e.target.value)}
                onKeyDown={e => renameNoteTitle(e.key)}
                onBlur={() => renameNoteTitle("Enter")}
                autoFocus />
                <p style={NoteInputLimitStyle()}
                >{NoteInputLimit()}</p>
            </div>
        : <div
            className={textStyle()}
            onDoubleClick={(e) => activateNoteForm(e)}>
            {noteName}
        </div>
    
    return (
        <li
            onDoubleClick={(e) => activateNoteForm(e)}
            className={s.li}>
            <div>
                <input type="checkbox" name="checkbox" id='checkbox' checked={completed} className={s.cursorPointer}
                    onChange={() => onChangeCheckboxHandler(notebookId, noteId)}/>
                {noteNameBlock}
            </div>
            
            <button
                onClick={() => onDeleteHandler(notebookId, noteId)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24px" height="24px"><path
                    d="M 28 11 C 26.895 11 26 11.895 26 13 L 26 14 L 13 14 C 11.896 14 11 14.896 11 16 C 11 17.104 11.896 18 13 18 L 14.160156 18 L 16.701172 48.498047 C 16.957172 51.583047 19.585641 54 22.681641 54 L 41.318359 54 C 44.414359 54 47.041828 51.583047 47.298828 48.498047 L 49.839844 18 L 51 18 C 52.104 18 53 17.104 53 16 C 53 14.896 52.104 14 51 14 L 38 14 L 38 13 C 38 11.895 37.105 11 36 11 L 28 11 z M 18.173828 18 L 45.828125 18 L 43.3125 48.166016 C 43.2265 49.194016 42.352313 50 41.320312 50 L 22.681641 50 C 21.648641 50 20.7725 49.194016 20.6875 48.166016 L 18.173828 18 z"
                    fill={ completed ? '#AFB1B2' : '' } /></svg>
            </button>
        </li>  
    )
    
}

export default Note;