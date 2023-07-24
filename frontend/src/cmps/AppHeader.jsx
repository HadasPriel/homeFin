import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { UserImg } from './ui/UserImg'
import lotus from "../assets/img/lotus.png"
import { Icon } from './ui/Icon'
import { useEffect, useState } from 'react'


export const AppHeader = () => {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [isHome, setIsHome] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') setIsHome(true)
        else setIsHome(false)
    }, [location])


    return (
        <header className={`app-header flex col space-between ${isHome ? 'hide' : ''}`}>
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