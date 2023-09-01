import { useRef, useState } from "react"
import { useToggle } from "../../../hooks/useToggle"
import { CommentList } from "./CommentList"


export const ExpenseComment = ({ expense, addComment }) => {


    const [comment, setComment] = useState('')

    const elForm = useRef(null)
    const [isEditorShow, toggleIsEditorShow] = useToggle(false, elForm)

    const onAddComment = (ev) => {
        ev.preventDefault()
        addComment(comment)
        toggleIsEditorShow()
    }

    const commentHandleChange = (ev) => {
        setComment(ev.target.value)
    }


    return (
        <section className="expense-comment" >
            {isEditorShow ?
                <form onSubmit={onAddComment} className="comment-form flex col" ref={elForm}>
                    <div className="comment-editor flex col">
                        <textarea onChange={commentHandleChange} placeholder="Write an update" />
                    </div>
                    <button className="update-btn btn suc" >Update</button>
                </form>
                :
                <div className="write-comment" onClick={toggleIsEditorShow} >
                    <p>Write an update</p>
                </div>
            }

            < CommentList comments={expense.comments} />

        </section>
    )
}