import { removeNote, toggleCompleted } from '../../slices/notesSlice';
import { useAppDispatch } from '../../store/hooks'

interface NoteProps{
    nodebookId: string,
    id: string,
    title: string,
    completed: boolean
}

const Note: React.FC<NoteProps> = ({id, title, completed, nodebookId}) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (nodebookId: string, titleId: string) => {
        const action = { nodebookId: nodebookId, titleId: titleId }
        dispatch(toggleCompleted(action))
    }
    const onDeleteHandler = (nodebookId: string, titleId: string) => {
        const action = { nodebookId: nodebookId, titleId: titleId }
        dispatch(removeNote(action))
    }
    return (
        <li>
            {title}
            <input type="checkbox" name="checkbox" checked={completed}
                onChange={() => onChangeHandler(nodebookId, id)}/>
            <button onClick={() => onDeleteHandler(nodebookId, id)}>Delete note</button>
        </li>  
    );
};

export default Note;