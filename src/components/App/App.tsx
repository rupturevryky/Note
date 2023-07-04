
import { useAppSelector } from '../../store/hooks';
import AddNoteboockButton from '../AddNoteboockButton/AddNoteboockButton';
import NoteItems from '../Note/NoteItems/NoteItems';
import Notebook from '../Notebook/Notebook';

import s from './App.module.scss';

function App() {

  const noteItemsIsActive = useAppSelector(store => store.windows.noteItems.active)

  return (
    <div className={s.App}>
      <AddNoteboockButton/>
      <Notebook />
      {noteItemsIsActive ? <NoteItems /> : null}
    </div>
  )
}

export default App;
