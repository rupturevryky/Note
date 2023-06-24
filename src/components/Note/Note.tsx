import { toggleCompleted } from '../../slices/notesSlice';
import { useAppDispatch } from '../../store/hooks'

interface NoteProps{
    nodeId: string,
    id: string,
    title: string,
    completed: boolean
}

const Note: React.FC<NoteProps> = ({id, title, completed, nodeId}) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (noteId: string, titleId: string) => {
        const action = { noteId: noteId, titleId: titleId }
        
        dispatch(toggleCompleted(action))
    }
    return (
        <li>
            {title}
            <input type="checkbox" name="checkbox" checked={completed}
                onChange={ () => onChangeHandler(nodeId, id)} />
        </li>  
    );
};

export default Note;