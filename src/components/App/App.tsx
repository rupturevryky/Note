
import AddNoteboockButton from '../AddNoteboockButton/AddNoteboockButton';
import Notebook from '../Notebook/Notebook';

import s from './App.module.scss';

function App() {

  return (
    <div className={s.App}>
      <AddNoteboockButton/>
      <Notebook />
    </div>
  )
}

export default App;
