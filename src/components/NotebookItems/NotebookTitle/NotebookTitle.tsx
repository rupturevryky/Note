import { useState } from "react";

import { removeNotebook, renameNotebook } from "../../../slices/notebookSlice";
import { removeNoteKey } from "../../../slices/notesSlice";
import { useAppDispatch } from "../../../store/hooks";

import s from "./notebookTitle.module.scss"

type NotebookTitleProps = {
    notebookId: string,
    title: string
}

const NotebookTitle: React.FC<NotebookTitleProps> = ({ title, notebookId }) => {
    
    const dispatch = useAppDispatch()

    const [titleInputIsActive, settitleInputIsActive] = useState<boolean>(false)    // локальный стейт для переименования notebook-а
    const [titleName, setTitleName] = useState<string>(title)

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

    const closeNotebook = () => {
        dispatch(removeNotebook(notebookId))
        dispatch(removeNoteKey(notebookId))
    }

    const NotebookTitleInput = titleInputIsActive                               // notebook заголовок
        ? <input                                                         // input для смены заголовка
            value={titleName}                              
            onChange={e => setTitleName(e.target.value)}
            onKeyDown={e => renameStateTitle(e.key)}
            onBlur={() => renameStateTitle("Enter")}
            autoFocus/>
        : <p                                                            // обычный <p> заголовок 
            onDoubleClick={toggleTitleInput}>{titleName}</p> 
    
    return (
        <div className={s.notebookTitle}>
            {NotebookTitleInput}
            <button
            onClick={closeNotebook}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.12 14.12" width="18px" height="18px"><title>closeBtn</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path
                    d="M14,.16A.58.58,0,0,1,14,1L7.86,7.06,14,13.15a.57.57,0,1,1-.8.8L7.06,7.86,1,14a.58.58,0,0,1-.81,0,.59.59,0,0,1,0-.8L6.25,7.06.16,1a.6.6,0,0,1,0-.81A.6.6,0,0,1,1,.16L7.06,6.25,13.15.16A.59.59,0,0,1,14,.16Z" /></g></g></svg>
            </button>
        </div>
    );
};

export default NotebookTitle;