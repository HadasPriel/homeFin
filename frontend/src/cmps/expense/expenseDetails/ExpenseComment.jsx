import { useRef, useState } from "react"
import { useToggle } from "../../../hooks/useToggle"
import { useClickOutside } from "../../../hooks/useClickOutside.js"
import { CommentList } from "./CommentList"
import { ExpenseCommentEditor } from "./ExpenseCommentEditor"


export const ExpenseComment = ({ expense, addComment }) => {


    const [comment, setComment] = useState('')

    const [isEditorShow, toggleIsEditorShow] = useToggle(false)
    // const elForm = useClickOutside(toggleIsEditorShow)

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
                <ExpenseCommentEditor toggleIsEditorShow={toggleIsEditorShow} onAddComment={onAddComment} />
                :
                <div className="write-comment" onClick={toggleIsEditorShow} >
                    <p>Write an update</p>
                </div>
            }

            < CommentList comments={expense.comments} />

        </section>
    )
}