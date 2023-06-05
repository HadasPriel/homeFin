import { useState, useRef, useEffect } from "react"

export const EditExpected = ({ expected, onUpdateCategory }) => {

    const [expectedToSave, setExpectedToSave] = useState(expected || '')
    const elExpected = useRef(null)
    useEffect(() => {
        elExpected.current.focus()
    }, [])

    const onSetExpectedToSave = async (ev) => {
        setExpectedToSave(ev.target.value)
    }

    const updateExpected = async (ev) => {
        ev.preventDefault()
        onUpdateCategory(ev, +expectedToSave)
    }

    return (
        <form onSubmit={updateExpected} name="expected" >
            <input
                ref={elExpected}
                className="expected description"
                type="number"
                placeholder="Insert expected monthly expense for category"
                value={expectedToSave}
                onChange={onSetExpectedToSave} />
        </form>
    )
}