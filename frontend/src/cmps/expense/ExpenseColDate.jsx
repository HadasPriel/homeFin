import { useRef } from "react";
import { DatePicker } from "../ui/date-picker"
import { format } from 'date-fns'
import { useToggle } from "../../hooks/useToggle"

export const ExpenseColDate = ({ expanseToSave, editExpenseTime }) => {
    const elCmp = useRef();

    const [isDateShow, setIsDateShow] = useToggle(false, elCmp)

    return (
        <div className="cell flex center" ref={elCmp}>
            <span className="date flex center" onClick={setIsDateShow}>
                {format(new Date(expanseToSave.cratedAt), 'dd.MM')}
            </span>
            {isDateShow && <DatePicker setIsDateShow={setIsDateShow} editExpenseTime={editExpenseTime} />}
        </div>
    )
}

