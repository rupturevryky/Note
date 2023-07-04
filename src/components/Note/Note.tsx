// import { useState } from 'react';

// import { toggleCompleted } from '../../slices/notesSlice';
import { toggleWindow } from '../../slices/windowsActiveManager';
import { useAppDispatch } from '../../store/hooks'
import IconBlock from '../UI/IconBlock/IconBlock';

import s from './note.module.scss'
// import NoteItems from './NoteItems/NoteItems';
interface NoteProps{
    notebookId: string,
    noteId: string,
    noteTitle: string,
    completed: boolean,
    place: number,
}

const Note: React.FC<NoteProps> = ({ notebookId, noteId, noteTitle, completed, place }) => {

    const dispatch = useAppDispatch()
    // const noteItemsActive = useAppSelector(store => store.windows.noteItems.active )

    // const [noteNameInputActive, setNoteNameInputActive] = useState<boolean>(false)
    // const [noteName, setNoteName] = useState(noteTitle)

    // const renameNoteTitle = (key: string) => {
    //         if (key === "Enter" && noteName.trim() !== '' && noteName !== noteTitle) {
    //             dispatch(renameNote({ notebookId: notebookId, noteId: noteId, newNoteName: noteName }))    // меняет title в state.notebook
    //             setNoteNameInputActive(false)
    //         } else if (key === "Enter" && noteName.trim() !== '') {                        // менять title в state.notebook бессмысленно, ведь он не изменился
    //             setNoteNameInputActive(false)
    //         } else if (key === "Enter" && noteName.trim() === '') {                        // пустое поле возвращается на нормальное со значением из state
    //             setNoteName(noteTitle)
    //             setNoteNameInputActive(false)
    //         }
    // }

    const activateNoteForm = (e: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleWindow({ window: 'noteItems', notebookId: notebookId, noteId: noteId}))
        }
    }

    // const changeNoteInputValue = (value: string) => {
    //     if (noteName.length < 25 || value.length < noteName.length) {
    //         setNoteName(value)
    //     }
    // }
    // const NoteInputLimit = () => noteName.length > 19 ? `Осталось ${25 - noteName.length} символов` : null
    // const NoteInputLimitStyle = () => {
    //     if (noteName.length === 25) {
    //         return {color: '#BC040E'}
    //     }
    //     if (noteName.length > 19) {
    //         return {color: 'orange'}
    //     }
    // }

    // const onChangeCheckboxHandler = (notebookId: string, noteId: string) => {
    //     const action = { notebookId: notebookId, noteId: noteId }
    //     dispatch(toggleCompleted(action))
    // }
    
    // const NoteInputStyle = () => {
    //     let width = 150
    //     if (noteName.length * 10 > width) {
    //         width = noteName.length * 10
    //     }
    //     return {width: `${width}px`}
    // }

    const textStyle = () => completed ? `${s.title} ${s.completedTitle} ${s.completedColor}` : `${s.title}`
    
    // const noteNameBlock = noteNameInputActive
    //     ? 
        // <div className={s.NoteTitleForm}>
        //         <input
        //             style={NoteInputStyle()}
        //             value={noteName}
        //             onChange={e => changeNoteInputValue(e.target.value)}
        //             onKeyDown={e => renameNoteTitle(e.key)}
        //             onBlur={() => renameNoteTitle("Enter")}
        //             autoFocus />
        //         <p style={NoteInputLimitStyle()}>{NoteInputLimit()}</p>
        //     </div>
        // : <div
        //     className={textStyle()}
        //     onDoubleClick={(e) => activateNoteForm(e)}>
        //     {noteName}
        // </div>
    
    return (
        <li
            onClick={(e) => activateNoteForm(e)}
            // onClick={() => onChangeCheckboxHandler(notebookId, noteId)}
            className={s.li}>
            <div>
                <IconBlock
                    notebookId={notebookId}
                    btn={"checked"}
                    activeColor={"#3CAA4E"}

                    noteId={noteId}
                    completedColor={"#AFB1B2"}
                    completedActiveColor={"#BC040E"}
                    completed={completed}
                />
            <div
                className={textStyle()}
                onClick={(e) => activateNoteForm(e)}>
                {noteTitle}
            </div>
            </div>
            
            <IconBlock
                notebookId={notebookId}
                btn={"rmNote"}
                activeColor={"#BC040E"}

                noteId={noteId}
                completedColor={"#AFB1B2"}
                completed={completed}
            />
        </li>  
    )
}

export default Note;