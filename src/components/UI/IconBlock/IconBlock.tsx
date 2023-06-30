import { useState } from "react";

import { useAppDispatch } from "../../../store/hooks";
import { removeNotebook } from "../../../slices/notebookSlice";
import { removeNoteKey, removeNote, toggleCompleted } from "../../../slices/notesSlice";

interface IconBlockProps {
    btn: string
    notebookId: string
    activeColor: string

    noteId?: string
    completedColor?: "#AFB1B2"
    completedActiveColor?: "#BC040E"
    completed?: boolean
}

const IconBlock: React.FC<IconBlockProps> = ({  btn, notebookId, noteId, completedColor, activeColor, completed, completedActiveColor }) => {

    const dispatch = useAppDispatch()
    
    const [BtnColor, setBtnColor] = useState<string>(completed && completedColor ? completedColor : '#000')

    const changeBtnColor = (color?: string) => {
        if (completed && completedActiveColor && color) {
            setBtnColor(completedActiveColor)
        } else if (color) {
            setBtnColor(activeColor)
        } else if (completedColor && completed) {
            setBtnColor(completedColor)
        } else {
            setBtnColor('#000')
        }
    }

    let tsx;
    
    if (btn === 'rmNotebook') {
        
        const closeNotebook = () => {
            dispatch(removeNotebook(notebookId))
            dispatch(removeNoteKey(notebookId))
        }
        
        tsx = (
            <button
            onMouseEnter={ () => changeBtnColor("color") }
            onMouseLeave={ () => changeBtnColor() }
            onClick={closeNotebook}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.12 14.12" width="18px" height="18px"><title>close</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path
                fill = {BtnColor}
                d="M14,.16A.58.58,0,0,1,14,1L7.86,7.06,14,13.15a.57.57,0,1,1-.8.8L7.06,7.86,1,14a.58.58,0,0,1-.81,0,.59.59,0,0,1,0-.8L6.25,7.06.16,1a.6.6,0,0,1,0-.81A.6.6,0,0,1,1,.16L7.06,6.25,13.15.16A.59.59,0,0,1,14,.16Z" /></g></g></svg>
        </button>
        )
    } else if (btn === 'rmNote' && noteId) {

            const onDeleteHandler = (notebookId: string, noteId: string) => {
                const action = { notebookId: notebookId, noteId: noteId }
                dispatch(removeNote(action))
            }

            tsx = (
                <button
                    onMouseEnter={ () => changeBtnColor("colorRed") }
                    onMouseLeave={ () => changeBtnColor() }
                    onClick={() => onDeleteHandler(notebookId, noteId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24px" height="24px"><path
                        d="M 28 11 C 26.895 11 26 11.895 26 13 L 26 14 L 13 14 C 11.896 14 11 14.896 11 16 C 11 17.104 11.896 18 13 18 L 14.160156 18 L 16.701172 48.498047 C 16.957172 51.583047 19.585641 54 22.681641 54 L 41.318359 54 C 44.414359 54 47.041828 51.583047 47.298828 48.498047 L 49.839844 18 L 51 18 C 52.104 18 53 17.104 53 16 C 53 14.896 52.104 14 51 14 L 38 14 L 38 13 C 38 11.895 37.105 11 36 11 L 28 11 z M 18.173828 18 L 45.828125 18 L 43.3125 48.166016 C 43.2265 49.194016 42.352313 50 41.320312 50 L 22.681641 50 C 21.648641 50 20.7725 49.194016 20.6875 48.166016 L 18.173828 18 z"
                        fill={ BtnColor } /></svg>
                </button>
            )
    } else if (btn === 'checked' && noteId && completedActiveColor) {

        const onChangeCheckboxHandler = (notebookId: string, noteId: string) => {
            const action = { notebookId: notebookId, noteId: noteId }
            dispatch(toggleCompleted(action))
            if (completed) {
                setBtnColor(activeColor)
            } else {
                setBtnColor(completedActiveColor)
            }
        }
        
        tsx = (
            <button
                onMouseEnter={ () => changeBtnColor("colorGreen") }
                onMouseLeave={ () => changeBtnColor() }
                onClick={() => onChangeCheckboxHandler(notebookId, noteId)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.08 8.7" width="18px" height="18px"><title>toggle</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path
                    fill={BtnColor}
                    d="M5,8.7a.62.62,0,0,1-.44-.18L.18,4.15a.64.64,0,0,1,0-.89.64.64,0,0,1,.89,0L5,7.19l7-7a.64.64,0,0,1,.89,0,.64.64,0,0,1,0,.89L5.44,8.52A.62.62,0,0,1,5,8.7Z" /></g></g></svg>
            </button>
        )
    }
    return (
        <>
            {tsx}
        </>
    )

}

export default IconBlock;