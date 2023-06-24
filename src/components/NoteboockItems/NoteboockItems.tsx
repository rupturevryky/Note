import { useState } from "react";

import { addNote } from "../../slices/notesSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import Note from "../Note/Note";

import s from "./noteboockItems.module.scss"

interface NoteboockItemsProos {
    id: string,
    title: string,
    filter: 'all' | 'completed' | 'uncompleted'
}

const NoteboockItems: React.FC<NoteboockItemsProos> = ({  id, title, filter }) => {
    
    const dispatch = useAppDispatch()
    const notes = useAppSelector(state => state.notes[id])

    const [AddTaskFormIsActive, setAddTaskFormIsActive] = useState<boolean>(false)
    const [TaskFormValue, setAddTaskFormValue] = useState<string>('')
     
    const noteList = notes?.map(note => (
        <Note
            nodeId={id}
            id={note.id}
            title={note.title}
            completed={note.completed}
            key={note.id} />
    ))

    const addTaskHandler = () => {
        const action = { noteId: id, title: TaskFormValue }
        dispatch(addNote(action))               // создаёт новую заметку
        setAddTaskFormValue('')                 // стирает локальный state
        setAddTaskFormIsActive(false)           // закрывает input для созданной task-и
    }
    const addTaskFormHandler = (value: string) => { // Управляемый input для новой task-и
        setAddTaskFormValue(value)
    }

    const addNewTaskHandler = () => {
        setAddTaskFormIsActive(true)
    }
    
    const AddTaskForm = AddTaskFormIsActive    
        ? <><input                               // input с строкой для новой task-и
            placeholder="Add your task..."
            value={TaskFormValue}
            onChange={(e) => addTaskFormHandler(e.target.value)} /> 
            <button onClick={addTaskHandler}>add</button></>  // создаёт task-у и убирает input
        : null
    
    return (
        
        <div className={s.noteboockItems}>
            {title}
            {noteList}
            {AddTaskForm}
            <button onClick={addNewTaskHandler}>Add new task</button> {/* Открывает и закрывает input */}
        </div>
        
    );
};

export default NoteboockItems;