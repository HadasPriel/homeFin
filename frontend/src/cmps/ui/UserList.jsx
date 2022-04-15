import { UserPreview } from "./UserPreview"

export const UserList = ({ members, expenseMember, func }) => {

    return (
        <ul className="user-list" >
            {members.map(member => <UserPreview user={member} key={member._id} expenseMember={expenseMember} func={func} />)}
        </ul>
    )
}

