import { useState } from "react"


export const ExpenseComment = ({ expense, addComment }) => {

    const [comment, setComment] = useState('')

    const onAddComment = (ev) => {
        ev.preventDefault()
        addComment(comment)
    }

    const commentHandleChange = (ev) => {
        setComment(ev.target.value)
    }



    return (
        <section className="expense-comment" >

            <form onSubmit={onAddComment} className="comment-editor flex col">
                <textarea onChange={commentHandleChange} placeholder="Write an update" />
                <button>OK</button>
            </form>

            <main>
                <p>{JSON.stringify(expense)}</p>
            </main>

        </section>
    )
}