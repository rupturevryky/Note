
import AddNoteboockButton from '../AddNoteboockButton/AddNoteboockButton';
import Noteboock from '../Notebook/Notebook';

import s from './App.module.scss';

function App() {

  return (
    <div className={s.App}>
      <AddNoteboockButton/>
      <Noteboock />
    </div>
  )
}

export default App;
