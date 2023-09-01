import { UserPreview } from "../../ui/UserPreview"
import { formatDistance } from 'date-fns'
import { Icon } from "../../ui/Icon"


export const CommentPreview = ({ comment }) => {

    return (
        <li className="comment-preview">
            <header className="comment-header header-set" >
                <UserPreview user={comment.byUser} />
                <div>
                    <span className="time">
                        {formatDistance(new Date(comment.createdAt), Date.now())}
                    </span>
                </div>
            </header>
            <pre>{comment.txt}</pre>
            <footer className="flex">
                <div className="btn-wrapper" >
                    <button className="btn solid flex center">
                        <Icon name="like" />
                        Like
                    </button>
                </div>
                <div className="btn-wrapper" >
                    <button className="btn solid flex center">
                        <Icon name="reply" />
                        Reply
                    </button>
                </div>
            </footer>

        </li>
    )
}


