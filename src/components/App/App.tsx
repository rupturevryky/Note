
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import './App.scss';

function App() {

  const count = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <div className="div">hello</div>
    </div>
  );
}

export default App;
