import { useState } from "react";

import { addNote } from "../../../slices/notesSlice";
import { useAppDispatch } from "../../../store/hooks";

import s from "./addTaskForm.module.scss"

interface AddTaskFormProps {
    notebookId: string
    setAddTaskFormIsActive: (boolean: boolean) => void
    setAddTaskBtnIsDisabled: (boolean: boolean) => void
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({notebookId, setAddTaskFormIsActive, setAddTaskBtnIsDisabled}) => {

    const dispatch = useAppDispatch()

    const [TaskFormValue, setTaskFormValue] = useState<string>('')

    const [addBtnColor, setAddBtnColor] = useState<string>('#000')

    const EraseEverything = () => {
        setAddBtnColor("#000")
        setTaskFormValue('')                                 // стирает локальный state
        setAddTaskFormIsActive(false)                           // закрывает input для созданной task-и  
    }

    const changeTaskFormValue = (target: EventTarget & HTMLInputElement) => {
        target.style.width = "100px";
        target.style.width = target.scrollWidth + 'px';                                     // input будет растягиваться
        if (TaskFormValue.length < 25 || target.value.length < TaskFormValue.length) {      // ограничение символов
            setTaskFormValue(target.value)
            setAddBtnColor("#3CAA4E")
        }
        if (target.value.trim().length === 0) {
            setAddBtnColor("#000")
        }
    }

    const EnterTaskFormHandler = (key: string) => {
        if (key === "Enter") {
            addTaskHandler()
        }
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

    const TaskFormLimit = () => TaskFormValue.length > 19 ? `Осталось ${25 - TaskFormValue.length} символов` : null
    const TaskFormLimitStyle = () => {
        if (TaskFormValue.length === 25) {
            return {color: '#BC040E'}
        }
        if (TaskFormValue.length > 19) {
            return {color: 'orange'}
        }
    }
    
    return (
        <>
            <div className={s.AddTaskForm}>
                <input                               // input с строкой для новой task-и
                    placeholder="Add your task..."
                    value={TaskFormValue}
                    
                    onChange={e => changeTaskFormValue(e.target)}      // Управляемый input для новой task-и
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
            <p style={TaskFormLimitStyle()}>{ TaskFormLimit() }</p>
        </>
    );
};

export default AddTaskForm;
