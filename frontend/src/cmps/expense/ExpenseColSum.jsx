import { useState, useRef } from "react"
import { useToggle } from "../../hooks/useToggle.js"
import { useEffectUpdate } from "../../hooks/useEffectUpdate"
import { PricePreview } from "../ui/PricePreview"


export const ExpenseColSum = ({ expenseToSave, onEditExpense, currency }) => {

    const [isEditSum, setIsEditSum] = useToggle(false)
    const [amount, setAmount] = useState(expenseToSave.sum.amount)
    const elInput = useRef(null)

    useEffectUpdate(() => {
        if (!isEditSum || !elInput.current) return
        elInput.current.focus()
        // eslint-disable-next-line
    }, [isEditSum, elInput])


    const onUpdateAmount = (ev) => {
        ev.preventDefault()
        if (amount !== expenseToSave.sum.amount) onEditExpense(ev, amount)
        setIsEditSum()
    }

    const handleChange = (ev) => {
        setAmount(+ev.target.value)
    }

    return (
        <section className={`expense-sum cell flex center`}>
            <div className={`frame flex center`} onClick={setIsEditSum} >
                {isEditSum ?
                    <form onSubmit={onUpdateAmount} name="amount" >
                        <input
                            className="cell-input"
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            onBlur={onUpdateAmount}
                            value={amount || ''}
                            ref={elInput} />
                    </form>
                    :
                    <PricePreview sum={amount} currency={currency} />}
            </div>
        </section>

    )
}

