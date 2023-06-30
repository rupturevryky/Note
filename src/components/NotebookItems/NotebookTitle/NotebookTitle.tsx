import { useState } from "react";

import { renameNotebook } from "../../../slices/notebookSlice";
import { useAppDispatch } from "../../../store/hooks";
import IconBlock from "../../UI/IconBlock/IconBlock";

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

    const changeNotebookInputValue = (value: string) => {
        if (titleName.length < 35 || value.length < titleName.length) {
            setTitleName(value)
        }
    }
    const NotebookInputLimit = () => titleName.length > 29 ? `Осталось ${35 - titleName.length} символов` : null
    const NotebookInputLimitStyle = () => {
        if (titleName.length === 35) {
            return {color: '#BC040E'}
        }
        if (titleName.length > 29) {
            return {color: 'orange'}
        }
    }
    const NotebookInputStyle = () => {
        let width = 150
        if (titleName.length * 9 > width) {
            width = titleName.length * 9
        }
        return {width: `${width}px`}
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

    const NotebookTitleInput = titleInputIsActive                               // notebook заголовок
        ? <div className={s.NotebookTitleForm}>
            <input                                                         // input для смены заголовка
                value={titleName}  
                style={NotebookInputStyle()}    
                onChange={e => changeNotebookInputValue(e.target.value)}
                onKeyDown={e => renameStateTitle(e.key)}
                onBlur={() => renameStateTitle("Enter")}
                autoFocus />
            <p style={NotebookInputLimitStyle()}
            >{NotebookInputLimit()}</p>
        </div>
        : <p                                                            // обычный <p> заголовок 
            onDoubleClick={toggleTitleInput}>{titleName}</p> 
    
    return (
        <div className={s.notebookTitle}>
            {NotebookTitleInput}

            <IconBlock
                notebookId={notebookId}
                btn={'rmNotebook'}
                activeColor={"#BC040E"}
            />
        </div>
    );
};

export default NotebookTitle;