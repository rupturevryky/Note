import { useEffect, useState } from 'react';
import { edit } from '../../../slices/notesSlice';
import { toggleWindow } from '../../../slices/windowsActiveManager';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import s from './noteItems.module.scss'

// type NoteItemsProps = {
//     title: string
//     notebookId: string
//     noteId: string
//     setTitle: (value: string) => void
// }

const NoteItems: React.FC = () => {

    const dispatch = useAppDispatch() 
    const noteItems = useAppSelector(store => store.windows.noteItems)
    // const notebook = useAppSelector(store => store.notebook.notebook.find(oneNotebook => oneNotebook.id === noteItems.notebookId))
    const note = useAppSelector(store => store.notes[noteItems.notebookId].find(note => note.id === noteItems.noteId))
    
    const [localTitle, setLocalTitle] = useState<string>(note?.title || 'ОШИБКА')
    const [localDescription, setLocalDescription] = useState<string>(note?.description || note?.description === '' ? note?.description : 'ОШИБКА')
    const [localDetails, setLocalDetails] = useState<string>(note?.details || note?.details === '' ? note?.details : 'ОШИБКА')

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        }
    }, [])
    
    function getWindowSize() {
      const {innerWidth, innerHeight} = window;
      return {innerWidth, innerHeight};
    }

    const NoteItemsBackgraund = () => { return { height: `${windowSize.innerHeight}px` } }
    
    const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            dispatch(edit({ notebookId: noteItems.notebookId, noteId: noteItems.noteId, title: localTitle, description: localDescription, details: localDetails }))
            dispatch(toggleWindow({ window: 'noteItems', notebookId: noteItems.notebookId, noteId: noteItems.noteId }))
        }
    }
    
    return (
        <div className={s.NoteItemsBackgraund} style={NoteItemsBackgraund()}
            onClick={e => close(e)}>
            <form>
                <fieldset>
                    <legend>note's name</legend>
                    <input type="text" value={localTitle} onChange={e => setLocalTitle(e.target.value)} />
                </fieldset>

                <fieldset>
                    <legend>description</legend>
                    <input type="text" value={localDescription}  onChange={e => setLocalDescription(e.target.value)}/>
                </fieldset>

                <fieldset>
                    <legend>details</legend>
                    <input type="text" value={localDetails} onChange={e => setLocalDetails(e.target.value)}/>
                </fieldset>
            </form> 
        </div>
    )
}

export default NoteItems;