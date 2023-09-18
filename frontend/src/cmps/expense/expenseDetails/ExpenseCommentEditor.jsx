import { useRef, useState } from "react"
import { useToggle } from "../../../hooks/useToggle"
import { useClickOutside } from "../../../hooks/useClickOutside.js"
import { CommentList } from "./CommentList"


export const ExpenseCommentEditor = ({ toggleIsEditorShow, onAddComment }) => {


    const [comment, setComment] = useState('')

    const elForm = useClickOutside(toggleIsEditorShow)

    const commentHandleChange = (ev) => {
        setComment(ev.target.value)
    }


    return (
        
        <form onSubmit={onAddComment} className="comment-form flex col" ref={elForm}>
            <div className="comment-editor flex col">
                <textarea onChange={commentHandleChange} placeholder="Write an update" />
            </div>
            <button className="update-btn btn suc" >Update</button>
        </form>
                
    )
}