import { useRef, useState } from "react";


export const AddExpense = ({ addExpense, color }) => {
    const [description, setDescription] = useState('');
    const [sum, setSum] = useState('');
    const elDescription = useRef(null)

    const onAddExpence = (ev) => {
        ev.preventDefault()
        addExpense({ description, sum })
        setDescription('')
        setSum('')
        elDescription.current.focus()
    }

    const onsetDescription = (ev) => {
        setDescription(ev.target.value)
    }
    const onsetSum = (ev) => {
        setSum(+ev.target.value)
    }

    return (
        <form onSubmit={onAddExpence} className="add-expense expense-preview flex row-container">
            <div className="first-cell flex">
                <span className="before" style={{ backgroundColor: `var(--${color})` }} ></span>
                <input
                    className="description"
                    ref={elDescription}
                    name="description"
                    type="text"
                    placeholder="+ Add Item"
                    value={description}
                    onChange={onsetDescription} />
                <input
                    className="description"
                    name="sum"
                    type="number"
                    placeholder="Add Sum"
                    value={sum}
                    onChange={onsetSum} />
            </div>
            <div className="btn-container">
                <button className="btn suc">Add</button>
            </div>
        </form>
    )
}

// .toISOString()