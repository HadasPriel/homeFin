import { useState, useEffect, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";


export const ExpenseSum = ({ expanseToSave, onEditExpense }) => {

    const [isEditSum, setIsEditSum] = useToggle(false)
    const [amount, setAmount] = useState(expanseToSave.sum.amount)


    const onUpdateAmount = (ev) => {
        ev.preventDefault()
        onEditExpense(ev, amount)
        setIsEditSum()
    }

    const handleChange = (ev) => {
        setAmount(+ev.target.value)
    }

    return (
        <form onSubmit={onUpdateAmount} name="amount">
            <input
                name="amount"
                type="number"
                onChange={handleChange}
                value={amount} />
        </form>
    )
}

