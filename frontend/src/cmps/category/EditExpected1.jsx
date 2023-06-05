import { useState, useRef, useEffect } from "react"

export const EditExpected = ({ expected, color, onUpdateCategory, toggleEditExpected }) => {
    const [expectedToSave, setExpectedToSave] = useState(expected || '')
    const elExpected = useRef(null)
    const elCmp = useRef(null)
    useEffect(() => {
        elExpected.current.focus()
    }, [])
    useEffect(() => {
        const onKeyDown = (ev) => {
            if (ev.keyCode === 27) toggleEditExpected()
        }
        const onClickOutside = (ev) => {
            if (!elCmp.current || elCmp.current.contains(ev.target)) {
                return
            }
            toggleEditExpected();
        };
        document.addEventListener('keyup', onKeyDown)
        document.addEventListener("mousedown", onClickOutside);

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener("mousedown", onClickOutside);
        }
        // eslint-disable-next-line
    }, [])

    const onSetExpectedToSave = async (ev) => {
        setExpectedToSave(ev.target.value)
    }
    const updateExpected = async (ev) => {
        ev.preventDefault()
        onUpdateCategory(ev, +expectedToSave)
    }

    return (
        <form
            className="edit-expected expense-preview flex row-container"
            name="expected"
            onSubmit={updateExpected}
            ref={elCmp} >
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