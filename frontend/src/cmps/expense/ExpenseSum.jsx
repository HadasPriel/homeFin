import { useState, useEffect, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";


export const ExpenseSum = ({ expanseToSave, onEditExpense }) => {

    const [isEditSum, setIsEditSum] = useToggle(false)
    const [amount, setAmount] = useState(expanseToSave.sum.amount)
    const elInput = useRef(null)

    useEffect(() => {
        if (!isEditSum || !elInput.current) return
        elInput.current.focus()
    }, [isEditSum, elInput])

    const currency = useRef(null)
    if (currency.current === null) {
        switch (expanseToSave.sum.currency) {
            case 'USA':
                currency.current = '$'
                break
            case 'ILS':
                currency.current = '₪'
                break
            default:
                currency.current = '₪'
        }
    }

    const onUpdateAmount = (ev) => {
        ev.preventDefault()
        if (amount !== expanseToSave.sum.amount) onEditExpense(ev, amount)
        setIsEditSum()
    }

    const handleChange = (ev) => {
        setAmount(+ev.target.value)
    }

    return (
        <section className={`expense-sum cell flex center`}>
            <div className={`frame flex center ${((currency.current === '$') ? 'row - re' : '')}`} onClick={setIsEditSum} >
                {!isEditSum && <div  >{amount}{currency.current}</div>}
                {isEditSum &&
                    <form onSubmit={onUpdateAmount} name="amount">
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

