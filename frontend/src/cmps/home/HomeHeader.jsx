import { Link } from 'react-router-dom'
import logo from '../../assets/img/lotus.png'
import { Icon } from '../ui/Icon'
import {useToggle} from '../../hooks/useToggle.js'

export const HomeHeader = () => {

    const [isMobileMenuShow, setIsMobileMenuShow] = useToggle(false)


    return (
        <header className='home-header header-set resp' >
            <div className='flex center' >
                <img src={logo} alt="logo" />
                <h1 className='title'> homefin <span>.com</span></h1>
            </div>
            <Icon name="menu" classNames="btn solid menu-btn" handler={setIsMobileMenuShow} />
            <nav className={`${isMobileMenuShow ? 'open floating-menu' : ''} flex align-self`}>
                <Link to="login">
                    <button className='btn solid'>Log In</button>
                </Link>
                <Link to="account/650ec0e2d940ac41305c096d/650ec106d940ac41305c096f" >
                    <button className='btn cta flex center'>
                        See Demo
                        <Icon name="full-arrow" />
                    </button>
                </Link>
            </nav>
        </header>
    )
}

//my tasks:
// account/64ee548b1963c24748c0dad1/65156c99db70716a24fd2964