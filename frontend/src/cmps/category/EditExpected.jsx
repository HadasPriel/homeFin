import { useState } from "react"
import { useAutoFocus } from "../../hooks/useAutoFocus.js"

export const EditExpected = ({ expected, onUpdateCategory }) => {

    const [expectedToSave, setExpectedToSave] = useState(expected || '')

    const elExpected = useAutoFocus()

    const onSetExpectedToSave = async (ev) => {
        setExpectedToSave(ev.target.value)
    }

    const updateExpected = async (ev) => {
        ev.preventDefault()
        onUpdateCategory(ev, +expectedToSave)
    }

    return (
        <form
            className="edit-expected flex align-center"
            onSubmit={updateExpected}
            name="expected" >
            <input
                ref={elExpected}
                className="expected description"
                type="number"
                placeholder="Insert expected"
                value={expectedToSave}
                onChange={onSetExpectedToSave} />
        </form>
    )
}