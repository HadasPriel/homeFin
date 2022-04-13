import { useState, useEffect, useRef } from "react";


export const CategoryTitleEdit = ({ updateTitle, categoryTitle, color }) => {

    const [title, setTitle] = useState(categoryTitle)
    const elTitle = useRef(null)

    useEffect(() => {
        elTitle.current.focus()
    }, [])

    const handleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onUpdateTitle = (ev) => {
        ev.preventDefault()
        updateTitle(title)
    }

    return (
        <form
            className="category-title-edit flex align-center"
            onSubmit={onUpdateTitle}
            style={{ color: `var(--${color})` }}>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                ref={elTitle}
                onBlur={onUpdateTitle}
            />
        </form>
    )
}

