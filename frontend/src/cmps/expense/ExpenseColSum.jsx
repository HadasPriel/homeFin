import { useState, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { utilService } from "../../services/util.service";


export const ExpenseColSum = ({ expenseToSave, onEditExpense }) => {

    const [isEditSum, setIsEditSum] = useToggle(false)
    const [amount, setAmount] = useState(expenseToSave.sum.amount)
    const elInput = useRef(null)

    useEffectUpdate(() => {
        if (!isEditSum || !elInput.current) return
        elInput.current.focus()
        // eslint-disable-next-line
    }, [isEditSum, elInput])

    const currency = useRef(null)
    if (currency.current === null) {
        currency.current = utilService.getCurrency(expenseToSave.sum.currency)
    }


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
                {!isEditSum &&
                    <div className={`flex ${((expenseToSave.sum.currency === '$') ? '' : 'row-re')}`} onClick={setIsEditSum} >
                        <span>{amount}</span> <span>{currency.current}</span>
                    </div>}
                {isEditSum &&
                    <form onSubmit={onUpdateAmount} name="amount" >
                        <input
                            className="cell-input"
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            onBlur={onUpdateAmount}
                            value={amount}
                            ref={elInput} />
                    </form>}
            </div>
        </section>

    )
}

