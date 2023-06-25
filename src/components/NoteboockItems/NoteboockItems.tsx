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

    const renameStateTitle = (key?: string) => {                                            // key для функции onKeyDown,
        if (key) {
            if (key === "Enter" && titleName.trim() !== '' && titleName !== title) {
                dispatch(renameNotebook({ newNotebookName: titleName, notebookId: notebookId }))    // меняет title в state.notebook
                settitleInputIsActive(false)
            } else if (key === "Enter" && titleName.trim() !== '') {                        // менять title в state.notebook бессмысленно, ведь он не изменился
                settitleInputIsActive(false)
            } else if (key === "Enter" && titleName.trim() === '') {                        // пустое поле возвращается на нормальное со значением из state
                setTitleName(title)
                settitleInputIsActive(false)
            }
        } else {                                                                            // в onBlur функция renameStateTitle проискодит без key
            if (titleName.trim() !== '' && titleName !== title) {
                dispatch(renameNotebook({ newNotebookName: titleName, notebookId: notebookId }))    // аналогично верхней части
                settitleInputIsActive(false)
            } else if (titleName.trim() !== '') {
                settitleInputIsActive(false)
            } else if (titleName.trim() === '') {
                setTitleName(title)
                settitleInputIsActive(false)
            }
        }
        
    }

    const AddTaskForm = AddTaskFormIsActive    
        ? <><input                               // input с строкой для новой task-и
            placeholder="Add your task..."
            value={TaskFormValue}
            onChange={e => setTaskFormValue(e.target.value)}      // Управляемый input для новой task-и
            onKeyDown={e => EnterTaskFormHandler(e.key)}        // добавляет task-у по нажатию Enter
            onBlur={addTaskHandler}
            autoFocus/> 
            <button onClick={addTaskHandler}>add</button></>  // создаёт task-у и убирает input
        : null
    
        const noteList = notes?.map(note => (       //создание мелких заметок
        <Note
            notebookId={notebookId}
            noteId={note.id}
            noteTitle={note.title}
            completed={note.completed}
            key={note.id} />
        ))
    
    const titleInput = titleInputIsActive                               // Заголовок
            ? <input value={titleName}                              // input для смены заголовка
                onChange={e => setTitleName(e.target.value)}
                onKeyDown={e => renameStateTitle(e.key)}
                onBlur={() => renameStateTitle()}
                autoFocus/>
            : <p onDoubleClick={toggleTitleInput}>{titleName}</p>        // обычный заголовок 
    
    return (
        <div className={s.noteboockItems}>
            {titleInput}
            <ul>
                {noteList}
            </ul>
            {AddTaskForm}
            <button onClick={addNewTaskHandler}>Add new task</button> {/* Открывает и закрывает input для новой note-ы*/}
        </div> 
    )
}

export default NoteboockItems;