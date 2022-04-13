import { useState, useEffect, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";


export const ExpenseDescription = ({ expanseToSave, onEditExpense, color }) => {

    const [isEditDesc, setIsEditDesc] = useToggle(false)
    const [description, setDescription] = useState(expanseToSave.description)
    const elInput = useRef(null)

    useEffect(() => {
        if (!isEditDesc || !elInput.current) return
        elInput.current.focus()
    }, [isEditDesc, elInput])


    const onUpdateDesc = (ev) => {
        ev.preventDefault()
        if (description !== expanseToSave.description) onEditExpense(ev, description)
        setIsEditDesc()
    }

    const handleChange = (ev) => {
        setDescription(ev.target.value)
    }

    return (
        <section className="expense-description first-cell flex align-center">
            <span className="before" style={{ backgroundColor: `var(--${color})` }} ></span>
            {isEditDesc ?
                <form onSubmit={onUpdateDesc} name="description">
                    <input
                        className="cell-input"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        onBlur={onUpdateDesc}
                        ref={elInput} />
                </form> :
                <p className="description" name="description"  >{expanseToSave.description}</p>
            }
            {!isEditDesc && <button className="edit-btn btn solid" onClick={setIsEditDesc} >Edit</button>}

        </section>

    )
}
