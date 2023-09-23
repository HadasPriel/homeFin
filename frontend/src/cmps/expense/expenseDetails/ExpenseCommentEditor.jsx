import { useState } from "react"
import { useClickOutside } from "../../../hooks/useClickOutside.js"
import { useAutoFocus } from "../../../hooks/useAutoFocus.js"


export const ExpenseCommentEditor = ({ toggleIsEditorShow, onAddComment }) => {

    const [comment, setComment] = useState('')

    const elForm = useClickOutside(toggleIsEditorShow)
    const elTextarea = useAutoFocus()

    const commentHandleChange = (ev) => {
        setComment(ev.target.value)
    }

    const addComment = (ev) => {
        ev.preventDefault()
        onAddComment(comment)
    }


    return (

        <form onSubmit={addComment} className="comment-form flex col" ref={elForm}>
            <div className="comment-editor flex col">
                <textarea
                    onChange={commentHandleChange}
                    placeholder="Write an update"
                    value={comment}
                    ref={elTextarea} />
            </div>
            <button className="update-btn btn suc" >Update</button>
        </form>

    )
}