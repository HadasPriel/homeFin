import { UserPreview } from "./UserPreview"

export const UserList = ({ members, expenseMember, eidtExpense }) => {

    return (
        <ul className="user-list" >
            {members.map(member => <UserPreview user={member} key={member._id} expenseMember={expenseMember} func={eidtExpense} />)}
        </ul>
    )
}

