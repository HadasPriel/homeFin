import { UserImg } from "./UserImg"



export const UserPreviewSmall = ({ user, accountMembers, func }) => {

    const clickHandler = (ev) => {
        func(ev, user)
    }

    const isAcoountMember = () => {
        const isMember = accountMembers.some(member => member._id === user._id)
        var className = isMember ? 'confirme' : 'decline'
        return className + ' add-btn btn solid'
    }

    if (!user) user = {
        _id: '123',
        username: 'Guest',
        fullname: 'Guest',
        imgUrl: ''
    }

    return (
        <li className='user-preview-small flex space-between align-center' key={user._id}>
            <div className='flex align-center'>
                <UserImg user={user} />
                <span className='name' onClick={clickHandler} >{user.username}</span>
            </div>
            {accountMembers && <span className={isAcoountMember()} onClick={clickHandler} ></span>}
        </li>
    )
}

