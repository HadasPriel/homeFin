import { UserImg } from "./UserImg"



export const UserPreview = ({ user, expenseMember, func }) => {

    const clickHandler = (ev) => {
        func(ev, user)
    }

    return (
        <section className="user-preview flex header-set" name="byUser" onClick={clickHandler} >
            <div className="flex center">
                <UserImg user={user} />
                <p className="user-name">{user.username}</p>
            </div>
            <span className={user._id === expenseMember._id ? 'confirme' : ''} ></span>

        </section>
    )
}

