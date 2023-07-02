import { useAppSelector } from "../../store/hooks"
import NotebookItems from "../NotebookItems/NotebookItems";

// import s from "./notebook.scss"

const Noteboock: React.FC = () => {

    const notebooks = useAppSelector(state => state.notebook.notebook)
    
    const notebookList = notebooks.map(notebook => (
        <NotebookItems                                     // загрузка notebooks
          key={notebook.id} notebookId={notebook.id}
          title={notebook.title} filter={notebook.filter}
          />
    ))
    

    return (
        <>
            {notebookList}
        </>
      );
};

export default Noteboock;