import { UserImg } from "./UserImg"



export const UserPreview = ({ user, expenseMember, func }) => {

    const clickHandler = (ev) => {
        func(ev, user)
    }

    if (!user) user = {
        _id: '123',
        username: 'Guest',
        fullname: 'Guest',
        imgUrl: ''
    }

    return (
        <section className="user-preview flex header-set" name="byUser" onClick={clickHandler} >
            <div className="flex center" name="byUser">
                <UserImg user={user} />
                <p className="user-name">{user.username}</p>
            </div>
            {expenseMember && <span className={user._id === expenseMember._id ? 'confirme' : ''} ></span>}

        </section>
    )
}

