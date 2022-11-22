import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserImg } from './ui/UserImg'
import lotus from "../assets/img/lotus.png"


export const AppHeader = () => {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)


    return (
        // <div className="app-header-wrapper">
        <header className="app-header flex col space-between">
            <nav>
                <Link to="/">
                    <img src={lotus} alt="lotus" />
                </Link>
                <Link to="/account">
                    <span className='account'></span>
                </Link>
            </nav>
            <nav>
                <Link to="/login" className="login-link" >
                    <UserImg user={loggedInUser} />
                </Link>
            </nav>
        </header>
        // </div>
    )
}