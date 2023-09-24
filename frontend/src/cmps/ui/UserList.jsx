import { useClickOutside } from "../../hooks/useClickOutside.js"
import { UserPreview } from "./UserPreview"

export const UserList = ({ members, expenseMember, func, setIsListShow }) => {

    var elList = useClickOutside(setIsListShow)

    return (
        <ul className="user-list" ref={elList} >
            {members.map(member => <UserPreview 
                key={member._id} 
                user={member} 
                expenseMember={expenseMember} 
                func={func} 
                setIsListShow={setIsListShow}
            />)}
        </ul>
    )
}

