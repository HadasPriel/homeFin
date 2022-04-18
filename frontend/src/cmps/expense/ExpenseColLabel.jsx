import { useToggle } from "../../hooks/useToggle"
import { ExpenseLabelEdit } from "./ExpenseLabelEdit"

export const ExpenseColLabel = ({ expanseToSave, accountLabels, onEditExpense }) => {
    const [isEditShow, setIsEditShow] = useToggle(false)

    return (
        <div className="expense-label cell flex center" >
            <div
                className="expense-label-preview flex center"
                onClick={setIsEditShow}
                style={{ backgroundColor: `${expanseToSave.label?.color || '#c4c4c4'}` }} >
                {expanseToSave.label?.txt}
            </div>
            {isEditShow && <ExpenseLabelEdit accountLabels={accountLabels} onEditExpense={onEditExpense} setIsEditShow={setIsEditShow} />}
        </div>
    )
}

