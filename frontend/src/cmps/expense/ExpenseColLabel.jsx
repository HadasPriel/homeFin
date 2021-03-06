import { useRef } from "react";


import { useToggle } from "../../hooks/useToggle"
import { ExpenseLabelEdit } from "./ExpenseLabelEdit"

export const ExpenseColLabel = ({ expanseToSave, accountLabels, onEditExpense, updateLabel, removeLabel }) => {
    const elCmp = useRef();
    const [isEditShow, setIsEditShow] = useToggle(false, elCmp)

    const labelToShow = accountLabels.find(label => label.id === expanseToSave.label?.id)

    const color = `var(--${labelToShow?.color || 'lb18_bright'})`

    return (
        <div className="expense-label cell flex center" ref={elCmp} >
            <div
                className="expense-label-preview flex center"
                onClick={setIsEditShow}
                style={{ backgroundColor: color }} >
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

