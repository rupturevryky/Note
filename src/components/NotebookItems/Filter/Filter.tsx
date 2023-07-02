import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeFilter } from "../../../slices/notebookSlice";

import s from './filter.module.scss'

type FilterProps = {
    notebookId: string
    active: boolean
}

const Filter: React.FC<FilterProps> = ({ notebookId, active }) => {

    const dispatch = useAppDispatch()
    const notebook = useAppSelector(state => state.notebook.notebook.find(OneNotebook => OneNotebook.id === notebookId))
    const filter = notebook?.filter

    const fideStyle: object = active ? { opacity: 1 } : {}
    
    const dispatchFilter = (value: 'all' | 'completed' | 'uncompleted') => {
        const action = {id: notebookId, filter: value}
        dispatch(changeFilter(action))
    }
    
    return (
        <div className={s.filter} style={fideStyle} >
            <button style={filter === 'all' ? {backgroundColor: '#f2f2f2'} : {}} onClick={() => dispatchFilter('all')}>all</button>
            <button style={filter === 'completed' ? {backgroundColor: '#f2f2f2'} : {}} onClick={() => dispatchFilter('completed')}>done</button>
            <button  style={filter === 'uncompleted' ? {backgroundColor: '#f2f2f2'} : {}} onClick={() => dispatchFilter('uncompleted')}>undone</button>
        </div>
    )
}

export default Filter;