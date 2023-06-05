import { useRef, useState } from "react"
import { StartRow } from "../category/StartRow"


export const AddExpense = ({ addExpense, color }) => {
    const [description, setDescription] = useState('')
    const elDescription = useRef(null)

    const onAddExpence = (ev) => {
        ev.preventDefault()
        addExpense({ description })
        setDescription('')
        elDescription.current.focus()
    }

    const onsetDescription = (ev) => {
        setDescription(ev.target.value)
    }

    return (
        <form onSubmit={onAddExpence} className="add-expense expense-preview-wrapper ">
            <div className="row-container" >
                <div className="expense-description flex">
                    <StartRow color={color} />
                    <div className="description-container cell flex">
                        <input
                            className=""
                            ref={elDescription}
                            name="description"
                            type="text"
                            placeholder="+ Add budget"
                            value={description}
                            onChange={onsetDescription} />
                    </div>
                </div>
                <div className="cell last-cell"></div>
            </div>
        </form>
    )
}











// .toISOString()

/* <form onSubmit={onAddExpence} className="add-expense expense-preview flex row-container">
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
        <button className="btn suc" style={{ width: 0, height: 0, padding: 0 }} >Add</button>
    </div>
</form> */
