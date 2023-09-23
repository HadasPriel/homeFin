import { useState } from "react"
import { useClickOutside } from "../../../hooks/useClickOutside.js"


export const ExpenseCommentEditor = ({ toggleIsEditorShow, onAddComment }) => {

    const [comment, setComment] = useState('')

    const elForm = useClickOutside(toggleIsEditorShow)

    const commentHandleChange = (ev) => {
        setComment(ev.target.value)
    }

    const addComment = (ev) => {
        ev.preventDefault()
        onAddComment(ev.target.value)
    }


    return (

        <form onSubmit={addComment} className="comment-form flex col" ref={elForm}>
            <div className="comment-editor flex col">
                <textarea onChange={commentHandleChange} placeholder="Write an update" value={comment} />
            </div>
            <button className="update-btn btn suc" >Update</button>
        </form>

    )
}