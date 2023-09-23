import { useToggle } from "../../../hooks/useToggle.js"
import { CommentList } from "./CommentList"
import { ExpenseCommentEditor } from "./ExpenseCommentEditor"


export const ExpenseComment = ({ expense, addComment }) => {

    const [isEditorShow, toggleIsEditorShow] = useToggle(false)

    const onAddComment = (comment) => {
        addComment(comment)
        toggleIsEditorShow()
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