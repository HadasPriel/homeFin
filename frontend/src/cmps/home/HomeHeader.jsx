import { Link } from 'react-router-dom'
import logo from '../../assets/img/lotus.png'
import { Icon } from '../ui/Icon'


export const HomeHeader = () => {

    return (
        <header className='home-header header-set' >
            <div className='flex center' >
                <img src={logo} alt="logo" />
                <h1 className='title'> homefin <span>.com</span></h1>
            </div>
            <nav className='flex align-self'>
                <Link to="login">
                    <button className='btn solid'>Log In</button>
                </Link>
                {/* <button className='btn solid'  >Invite</button> */}
                <Link to="account/651a6cc8bfc7a6494cf1cb0a/651a6cd3bfc7a6494cf1cb0c" >
                    <button className='btn cta flex center'>
                        Get started
                        <Icon name="full-arrow" />
                    </button>
                </Link>
                {/* <Icon name="menu" classNames="btn solid" /> */}
            </nav>
        </header>
    )
}

//my tasks:
// account/64ee548b1963c24748c0dad1/65156c99db70716a24fd2964