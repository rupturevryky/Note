import { useState } from "react";

import { addNote } from "../../slices/notesSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import Note from "../Note/Note";
import NotebookTitle from "./NotebookTitle/NotebookTitle";

import s from "./notebookItems.module.scss"


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

    const [AddTaskBtnIsDisabled, setAddTaskBtnIsDisabled] = useState<boolean>(false)
    const [addBtnColor, setAddBtnColor] = useState<string>('#000')

    const EraseEverything = () => {
        setAddBtnColor("#000")
        setTaskFormValue('')                                 // стирает локальный state
        setAddTaskFormIsActive(false)                           // закрывает input для созданной task-и  
    }

    const addTaskHandler = () => {
        if (TaskFormValue && TaskFormValue.trim() !== '') {                // проверка input-а на пустоту
            const action = { nodebookId: notebookId, title: TaskFormValue }
            dispatch(addNote(action))                                      // создаёт новую заметку
            EraseEverything()

            setTimeout( ()=> setAddTaskBtnIsDisabled(false), 200)   // setTimeout нужен, чтобы если прользователь кликнет на кнопку Add new task, не появлялся сразу
        } else {                                                                                                                                // новый инпут
            EraseEverything()

            setAddTaskBtnIsDisabled(false)
        }
        
    }

    const addNewTaskHandler = () => {
        if (!AddTaskBtnIsDisabled) {
            setAddTaskFormIsActive(true)        // активирует input
            setAddTaskBtnIsDisabled(true)      // блокирует кнопку активации инпута
        }
    }

    const EnterTaskFormHandler = (key: string) => {
        if (key === "Enter") {
            addTaskHandler()
        }
    }

    const changeTaskFormValue = (value: string) => {
        if (TaskFormValue.length < 25 || value.length < TaskFormValue.length) {
            setTaskFormValue(value)
            setAddBtnColor("#3CAA4E")
        }
        if (value.trim().length === 0) {
            setAddBtnColor("#000")
        }
    }
    const TaskFormLimit = () => TaskFormValue.length > 19 ? `Осталось ${25 - TaskFormValue.length} символов` : null
    const TaskFormLimitStyle = () => {
        if (TaskFormValue.length === 25) {
            return {color: '#BC040E'}
        }
        if (TaskFormValue.length > 19) {
            return {color: 'orange'}
        }
    }
    const TaskFormStyle = () => {
        let width = 150
        if (TaskFormValue.length * 10 > width) {
            width = TaskFormValue.length * 10
        }
        return {width: `${width}px`}
    }

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
    
    const AddTaskForm = AddTaskFormIsActive    
        ? <div  className={s.AddTaskForm}>
            <input                               // input с строкой для новой task-и
                placeholder="Add your task..."

                value={TaskFormValue}
                style={TaskFormStyle()}
                
                onChange={e => changeTaskFormValue(e.target.value)}      // Управляемый input для новой task-и
                onKeyDown={e => EnterTaskFormHandler(e.key)}        // добавляет task-у по нажатию Enter
                onBlur={addTaskHandler}
                autoFocus/>     
            <button
                style={addBtnColor === "#3CAA4E" ? {cursor: "pointer"} : {}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.08 8.7" width="18px" height="18px"><title>save</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path
                    fill={addBtnColor}
                    d="M5,8.7a.62.62,0,0,1-.44-.18L.18,4.15a.64.64,0,0,1,0-.89.64.64,0,0,1,.89,0L5,7.19l7-7a.64.64,0,0,1,.89,0,.64.64,0,0,1,0,.89L5.44,8.52A.62.62,0,0,1,5,8.7Z" /></g></g></svg>
            </button>
        </div>  
        : null
    
    return (
        <div className={s.noteboockItems}>

            <NotebookTitle                  // notebook заголовок
                notebookId={notebookId}
                title={title} />
            
            <ul>
                {noteList}              {/*      список из <Note/>       */}
            </ul>

            {AddTaskForm}
            <p style={TaskFormLimitStyle()}>{ TaskFormLimit() }</p>
            <button                             // Открывает и закрывает input для новой note-ы
                onClick={addNewTaskHandler}
                className={s.addNewTaskButton}
                disabled={AddTaskBtnIsDisabled}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.5" width="18px" height="18px"><title>add task</title><g id="Слой_2" data-name="Слой 2">
                    <g id="Слой_1-2" data-name="Слой 1"><path d="M19.5,9.75a.58.58,0,0,1-.57.57H10.32v8.61a.57.57,0,0,1-1.14,0V10.32H.57a.57.57,0,0,1,0-1.14H9.18V.57a.57.57,0,0,1,1.14,0V9.18h8.61A.58.58,0,0,1,19.5,9.75Z" /></g></g></svg>
                <div>Add new task</div>
            </button> 

        </div> 
    )
}

export default NoteboockItems;