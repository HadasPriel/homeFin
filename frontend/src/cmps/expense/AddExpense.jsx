import { useRef, useState } from "react"
import { StartRow } from "../category/StartRow"


export const AddExpense = ({ addExpense, color }) => {
    const [description, setDescription] = useState('')
    const [sum, setSum] = useState('')
    const elDescription = useRef(null)

    const onAddExpence = (ev) => {
        console.log('sdd');
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

        <form onSubmit={onAddExpence} className="add-expense expense-preview-wrapper ">
            <div className="row-container" >

                <div className="expense-description flex">
                    <StartRow color={color} />
                    <input
                        className="description-container cell flex"
                        ref={elDescription}
                        name="description"
                        type="text"
                        placeholder="+ Add Budget"
                        value={description}
                        onChange={onsetDescription} />
                </div>
                <div className="cell empty"></div>
            </div>
            {/* <input
                    className="cell"
                    name="sum"
                    type="number"
                    placeholder="Add Sum"
                    value={sum}
                    onChange={onsetSum} /> */}
            <button className="btn suc" style={{ width: 0, height: 0, padding: 0 }} >Add</button>
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
        <button className="btn suc">Add</button>
    </div>
</form> */