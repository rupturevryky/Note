// import { useAppDispatch } from "../../store/hooks"
import s from "./noteboockItems.module.scss"

interface NoteboockItemsProos {
    id: string,
    title: string,
    filter: 'all' | 'completed' | 'uncompleted'
}

const NoteboockItems: React.FC<NoteboockItemsProos> = ({id, title, filter}) => {
    // const dispatch = useAppDispatch()

    
    return (
        <div className={s.noteboockItems}>
            {title}
        </div>
    );
};

export default NoteboockItems;