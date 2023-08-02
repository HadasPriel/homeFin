import { useRef } from "react";
import { DatePicker } from "../ui/date-picker"
import { format } from 'date-fns'
import { useToggle } from "../../hooks/useToggle"

export const ExpenseColDate = ({ expanseToSave, editExpenseTime }) => {
    const elCmp = useRef();

    const [isDateShow, setIsDateShow] = useToggle(false, elCmp)
   
    const dateFormat = `MMM dd ${new Date(expanseToSave.cratedAt).getFullYear() !== new Date().getFullYear()? ' ,yyyy' : ''}`

    return (
        <div className="cell flex center" ref={elCmp}>
            <span className="date flex center" onClick={setIsDateShow}>
                {format(new Date(expanseToSave.cratedAt), dateFormat)}
            </span>
            {isDateShow && <DatePicker setIsDateShow={setIsDateShow} editExpenseTime={editExpenseTime} />}
        </div>
    )
}
