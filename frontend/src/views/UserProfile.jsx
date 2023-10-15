import { UserImg } from '../cmps/ui/UserImg'


export const UserProfile = ({ user, doLogout }) => {


    return (
        <section className='user-profile flex col center'>
            <h3 className='usermane' > Hi {user.username}</h3>
            <UserImg user={user} />
            <button className='btn solid' onClick={doLogout} >Log Out</button>
        </section>
    )
}
