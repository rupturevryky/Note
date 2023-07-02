
import AddNoteboockButton from '../AddNoteboockButton/AddNoteboockButton';
import NoteItems from '../Note/NoteItems/NoteItems';
import Notebook from '../Notebook/Notebook';

import s from './App.module.scss';

function App() {

  return (
    <div className={s.App}>
      <AddNoteboockButton/>
      <Notebook />
      <NoteItems />
    </div>
  )
}

export default App;
