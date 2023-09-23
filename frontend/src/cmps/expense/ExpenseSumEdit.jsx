import { useState, useEffect, useRef } from "react"
import { useToggle } from "../../hooks/useToggle.js"


export const ExpenseSum = ({ expenseToSave, onEditExpense }) => {

    const [isEditSum, setIsEditSum] = useToggle(false)
    const [amount, setAmount] = useState(expenseToSave.sum.amount)


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

