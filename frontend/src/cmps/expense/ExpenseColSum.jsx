import { useState, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";
import { utilService } from "../../services/util.service";


export const ExpenseColSum = ({ expanseToSave, onEditExpense }) => {

    const elCmp = useRef(null)
    const [isEditSum, setIsEditSum] = useToggle(false, elCmp)
    const [amount, setAmount] = useState(expanseToSave.sum.amount)
    const elInput = useRef(null)

    useEffectUpdate(() => {
        console.log('run');
        if (!isEditSum || !elInput.current) return
        elInput.current.focus()
        // eslint-disable-next-line
    }, [isEditSum, elInput])

    const currency = useRef(null)
    if (currency.current === null) {
        currency.current = utilService.getCurrency(expanseToSave.sum.currency)
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
            <div className={`frame flex center`} onClick={setIsEditSum} >
                {!isEditSum &&
                    <div className={`flex ${((expanseToSave.sum.currency === '$') ? '' : 'row-re')}`} onClick={setIsEditSum} >
                        <span>{amount}</span> <span>{currency.current}</span>
                    </div>}
                {isEditSum &&
                    <form onSubmit={onUpdateAmount} name="amount" ref={elCmp}>
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

