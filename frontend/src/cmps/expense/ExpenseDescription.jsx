import { useState } from "react"
import { useToggle } from "../../hooks/useToggle.js"

import { StartRow } from "../category/StartRow"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useAutoFocus } from "../../hooks/useAutoFocus.js"


export const ExpenseDescription = ({ expenseToSave, onEditExpense, color, cotegoryId }) => {
    let { accountId, monthId } = useParams()
    const [isEditDesc, setIsEditDesc] = useToggle(false)
    const [description, setDescription] = useState(expenseToSave.description)
    const elInput = useAutoFocus()

    // const elInput = useRef(null)
    // useEffectUpdate(() => {
    //     if (!isEditDesc || !elInput.current) return
    //     elInput.current.focus()
    // }, [isEditDesc, elInput])


    const onUpdateDesc = (ev) => {
        ev.preventDefault()
        if (description !== expenseToSave.description) onEditExpense(ev, description)
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
                    <p className="description" name="description">
                        {/* {expenseToSave.description} */}
                        <Link to={`/account/${accountId}/${monthId}/${cotegoryId}/${expenseToSave.id}`}>{expenseToSave.description}</Link>
                    </p>
                }
                {!isEditDesc && <button className="flex align-center edit-btn btn solid" onClick={setIsEditDesc} >Edit</button>}
            </div>

        </section>

    )
}
