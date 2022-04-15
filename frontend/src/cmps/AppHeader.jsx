import { Link } from 'react-router-dom'
import lotus from "../assets/img/lotus.png"


export const AppHeader = () => {



    return (
        <header className="app-header flex col">
            <nav>
                <Link to="/">
                    <img src={lotus} alt="lotus" />
                </Link>
                <Link to="/account">
                    <span className='account'></span>
                </Link>
            </nav>
            <nav>
                <Link to="/login">
                    <span>login</span>
                </Link>
            </nav>
        </header>
    )
}