import { useState } from "react";
import { renameNotebook } from "../../slices/notebookSlice";

import { addNote } from "../../slices/notesSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import Note from "../Note/Note";

import s from "./noteboockItems.module.scss"

interface NoteboockItemsProos {
    notebookId: string,
    title: string,
    filter: 'all' | 'completed' | 'uncompleted'
}

const NoteboockItems: React.FC<NoteboockItemsProos> = ({  notebookId, title, filter }) => {
    
    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes[notebookId])

    const [AddTaskFormIsActive, setAddTaskFormIsActive] = useState<boolean>(false)    // локальный стейт для добавления note-ы
    const [TaskFormValue, setTaskFormValue] = useState<string>('')

    const [titleInputIsActive, settitleInputIsActive] = useState<boolean>(false)    // локальный стейт для переименования notebook-а
    const [titleName, setTitleName] = useState<string>(title)

    const EraseEverything = () => {
        setTaskFormValue('')                                 // стирает локальный state
        setAddTaskFormIsActive(false)                           // закрывает input для созданной task-и
    }

    const addTaskHandler = () => {
        if (TaskFormValue && TaskFormValue.trim() !== '') {                // проверка input-а на пустоту
            const action = { nodebookId: notebookId, title: TaskFormValue }
            dispatch(addNote(action))                                       // создаёт новую заметку
            EraseEverything()
        } else {
            EraseEverything()
        }
        
    }

    const addNewTaskHandler = () => {
        if (AddTaskFormIsActive) {
            EraseEverything()
        } else {
            setAddTaskFormIsActive(true)
        }
    }

    const EnterTaskFormHandler = (key: string) => {
        if (key === "Enter") {
            addTaskHandler()
        }
    }

    const toggleTitleInput = () => {
        settitleInputIsActive(true)
    }

    const renameStateTitle = (key: string) => {                                            // key для функции onKeyDown,
            if (key === "Enter" && titleName.trim() !== '' && titleName !== title) {
                dispatch(renameNotebook({ newNotebookName: titleName, notebookId: notebookId }))    // меняет title в state.notebook
                settitleInputIsActive(false)
            } else if (key === "Enter" && titleName.trim() !== '') {                        // менять title в state.notebook бессмысленно, ведь он не изменился
                settitleInputIsActive(false)
            } else if (key === "Enter" && titleName.trim() === '') {                        // пустое поле возвращается на нормальное со значением из state
                setTitleName(title)
                settitleInputIsActive(false)
            }
        
    }

    const AddTaskForm = AddTaskFormIsActive    
        ? <div  className={s.AddTaskForm}>
            <input                               // input с строкой для новой task-и
                placeholder="Add your task..."

                value={TaskFormValue}
                onChange={e => setTaskFormValue(e.target.value)}      // Управляемый input для новой task-и
                onKeyDown={e => EnterTaskFormHandler(e.key)}        // добавляет task-у по нажатию Enter
                onBlur={addTaskHandler}
                autoFocus/> 
            <button onClick={addTaskHandler}>add</button></div>  // создаёт task-у и убирает input
        : null
    
        const noteList = notes?.map((note, place) => (       //создание мелких заметок
        <Note
            notebookId={notebookId}
            noteId={note.id}
            noteTitle={note.title}
            completed={note.completed}
            key={note.id}
            place={place}
            />
        ))
    
    const titleInput = titleInputIsActive                               // notebook заголовок
        ? <input                                                         // input для смены заголовка
            value={titleName}                              
            onChange={e => setTitleName(e.target.value)}
            onKeyDown={e => renameStateTitle(e.key)}
            onBlur={() => renameStateTitle("Enter")}
            autoFocus/>
        : <p                                                            // обычный <p> заголовок 
            className={s.notebookTitle}
            onDoubleClick={toggleTitleInput}>{titleName}</p>        
    
    return (
        <div className={s.noteboockItems}>
            {titleInput}                                                 {/* notebook заголовок */}
            <ul>
                {noteList}
            </ul>
            {AddTaskForm}
            <button                             // Открывает и закрывает input для новой note-ы
                onClick={addNewTaskHandler}
                className={s.addNewTaskButton}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
                Add new task
            </button> 
        </div> 
    )
}

export default NoteboockItems;