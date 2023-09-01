import { CommentPreview } from "./CommentPreview"


export const CommentList = ({ comments }) => {


    return (
        <ul className="comment-list">
            {comments.map(comment => <CommentPreview key={comment.id} comment={comment} />)}
        </ul>
    )
}


