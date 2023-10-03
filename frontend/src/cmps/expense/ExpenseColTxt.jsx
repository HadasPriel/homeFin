import { useState, useRef } from "react"
import { useToggle } from "../../hooks/useToggle.js"
import { useEffectUpdate } from "../../hooks/useEffectUpdate"


export const ExpenseColTxt = ({ expenseToSave, onEditExpense }) => {

    const [isEditTxt, setIsEditTxt] = useToggle(false)
    const [txt, setTxt] = useState(expenseToSave.txt || '')
    const elInput = useRef(null)

    useEffectUpdate(() => {
        if (!isEditTxt || !elInput.current) return
        elInput.current.focus()
        // eslint-disable-next-line
    }, [isEditTxt, elInput])


    const onUpdateTxt = (ev) => {
        ev.preventDefault()
        if (txt !== expenseToSave.txt) onEditExpense(ev, txt)
        setIsEditTxt()
    }

    const handleChange = (ev) => {
        setTxt(ev.target.value)
    }

    return (
        <section className={`expense-sum expense-txt cell flex center`}>
            <div className={`frame flex align-center`} onClick={setIsEditTxt} >
                {isEditTxt ?
                    <form onSubmit={onUpdateTxt} name="txt" >
                        <input
                            className="cell-input"
                            name="txt"
                            type="text"
                            onChange={handleChange}
                            onBlur={onUpdateTxt}
                            value={txt}
                            ref={elInput} />
                    </form>
                    :
                    <p>{expenseToSave.txt}</p>}
            </div>
        </section>

    )
}

