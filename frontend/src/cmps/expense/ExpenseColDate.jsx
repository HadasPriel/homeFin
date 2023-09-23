import { DatePicker } from "../ui/date-picker"
import { format } from 'date-fns'
import { useToggle } from "../../hooks/useToggle.js"

export const ExpenseColDate = ({ expenseToSave, editExpenseTime }) => {

    const [isDateShow, setIsDateShow] = useToggle(false)
   
    const dateFormat = `MMM dd ${new Date(expenseToSave.cratedAt).getFullYear() !== new Date().getFullYear()? ' ,yyyy' : ''}`

    return (
        <div className="cell flex center">
            <span className="date flex center" onClick={setIsDateShow}>
                {format(new Date(expenseToSave.cratedAt), dateFormat)}
            </span>
            {isDateShow && <DatePicker setIsDateShow={setIsDateShow} editExpenseTime={editExpenseTime} />}
        </div>
    )
}
