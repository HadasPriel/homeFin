
export const UserImg = ({ user }) => {



    return (
        <img className="profile-img" src={user.imgUrl} alt="profile-img" title={user.username} />
    )
}

