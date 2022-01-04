import { Link } from 'react-router-dom'
import lotus from "../assets/img/lotus.png"


export const AppHeader = () => {

    return (
        <header className="app-header flex col">
            <Link to="/">
                <img src={lotus} alt="lotus" />
            </Link>
            <Link to="/account">
                <span className='account'></span>
            </Link>
        </header>
    )
}