
import { useToggle } from "../../hooks/useToggle.js"
import { ExpenseLabelEdit } from "./ExpenseLabelEdit"

export const ExpenseColLabel = ({ expenseToSave, accountLabels, onEditExpense, updateLabel, removeLabel }) => {
    const [isEditShow, setIsEditShow] = useToggle(false)

    const labelToShow = accountLabels.find(label => label.id === expenseToSave.label?.id)

    const color = `var(--${labelToShow?.color || 'lb18_bright'})`

    return (
        <div className="expense-label cell flex center" >
            <div
                className="expense-label-preview flex center"
                onClick={setIsEditShow}
                style={{ backgroundColor: color }} >
                <span className='fold'></span>
                {labelToShow?.txt}
            </div>
            {isEditShow && <ExpenseLabelEdit
                accountLabels={accountLabels}
                onEditExpense={onEditExpense}
                setIsEditShow={setIsEditShow}
                updateLabel={updateLabel}
                removeLabel={removeLabel} />}
        </div>
    )
}

