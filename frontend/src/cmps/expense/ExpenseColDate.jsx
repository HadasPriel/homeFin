import { useRef } from "react";
import { DatePicker } from "../ui/date-picker"
import { format } from 'date-fns'
import { useToggle } from "../../hooks/useToggle"

export const ExpenseColDate = ({ expenseToSave, editExpenseTime }) => {
    const elCmp = useRef();

    const [isDateShow, setIsDateShow] = useToggle(false, elCmp)
   
    const dateFormat = `MMM dd ${new Date(expenseToSave.cratedAt).getFullYear() !== new Date().getFullYear()? ' ,yyyy' : ''}`

    return (
        <div className="cell flex center" ref={elCmp}>
            <span className="date flex center" onClick={setIsDateShow}>
                {format(new Date(expenseToSave.cratedAt), dateFormat)}
            </span>
            {isDateShow && <DatePicker setIsDateShow={setIsDateShow} editExpenseTime={editExpenseTime} />}
        </div>
    )
}
