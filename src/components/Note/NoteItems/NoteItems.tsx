import { useAppSelector } from '../../../store/hooks';
import s from './noteItems.module.scss'

// type NoteItemsProps = {
//     title: string
//     notebookId: string
//     noteId: string
//     setTitle: (value: string) => void
// }

const NoteItems: React.FC = () => {

    const noteItems = useAppSelector(store => store.windows.noteItems)
    
    return (
        <form className={s.NoteItems}>
            <fieldset>
                <legend>note's name</legend>
                <input type="text" value='title'/>
            </fieldset>

            <fieldset>
                <legend>discription</legend>
                <input type="text" />
            </fieldset>

            <fieldset>
                <legend>details</legend>
                <input type="text" />
            </fieldset>
        </form> 
    )
};

export default NoteItems;