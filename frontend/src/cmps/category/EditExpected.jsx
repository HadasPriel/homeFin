import { useState, useRef, useEffect } from "react"

export const EditExpected = ({ expected, color, onUpdateCategory, toggleEditExpected }) => {
    const [expectedToSave, setExpectedToSave] = useState(expected || '')
    const elExpected = useRef(null)
    useEffect(() => {
        elExpected.current.focus()
    }, [])
    useEffect(() => {
        const onKeyDown = (ev)=>{
            if (ev.keyCode === 27) toggleEditExpected()
        }
        document.addEventListener('keyup', onKeyDown)
        
        return ()=>{
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const onSetExpectedToSave = async (ev) => {
        setExpectedToSave(ev.target.value)
    }
    const updateExpected = async (ev) => {
        ev.preventDefault()
        onUpdateCategory(ev, +expectedToSave)
    }

    return (
        <form className="edit-expected add-expense expense-preview flex row-container" name="expected" onSubmit={updateExpected}>
            <div className="first-cell flex">
                <span className="before" style={{ backgroundColor: `var(--${color})` }} ></span>
                <input
                ref={elExpected}
                    className="expected description"
                    type="number"
                    placeholder="Insert expected monthly expense for category"
                    value={expectedToSave}
                    onChange={onSetExpectedToSave} />
            </div>
            <div className="btn-container">
                <button className="btn suc">Save</button>
            </div>
        </form>
    )
}