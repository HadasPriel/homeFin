import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserImg } from './ui/UserImg'
import lotus from "../assets/img/lotus.png"
import { Icon } from './ui/Icon'


export const AppHeader = () => {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    return (
        <header className={`app-header flex col space-between`}>
            <nav>
                <Link to="/">
                    <img src={lotus} alt="lotus" />
                </Link>
                <Link to="/account">
                    <Icon name="table" />
                    {/* <span className='account'></span> */}
                </Link>
            </nav>
            <nav>
                <Link to="/login" className="login-link" >
                    <UserImg user={loggedInUser} />
                </Link>
            </nav>
        </header>
    )
}