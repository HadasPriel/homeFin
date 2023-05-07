import { useState, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useEffectUpdate } from "../../hooks/useEffectUpdate";

import { StartRow } from "../category/StartRow"


export const ExpenseDescription = ({ expanseToSave, onEditExpense, color }) => {

    const elInput = useRef(null)
    const [isEditDesc, setIsEditDesc] = useToggle(false)
    const [description, setDescription] = useState(expanseToSave.description)

    useEffectUpdate(() => {
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
        <section className="expense-description flex align-center">
            <StartRow color={color} />
            <div className="description-container cell flex" >
                {isEditDesc ?
                    <form onSubmit={onUpdateDesc} name="description" className="description " >
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={handleChange}
                            onBlur={onUpdateDesc}
                            ref={elInput} />
                    </form> :
                    <p className="description" name="description">{expanseToSave.description}</p>
                }
                {!isEditDesc && <button className="flex align-center edit-btn btn solid" onClick={setIsEditDesc} >Edit</button>}
            </div>

        </section>

    )
}
