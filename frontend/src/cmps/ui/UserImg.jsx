import profileImg from '../../assets/img/user.png'

export const UserImg = ({ user }) => {

    return (
        <img 
            name="byUser" 
            className="profile-img" 
            src={user?.imgUrl || profileImg} 
            alt="profile-img" 
            title={user?.username} 
        />
    )
}

