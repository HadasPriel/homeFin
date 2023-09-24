import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useToggle } from '../../hooks/useToggle.js'
import { Icon } from '../ui/Icon'


export const AccountHeader = ({ account, accountId, toggleIsInviteShow, saveDescription, isScrolledToTop }) => {

    const [desc, setDesc] = useState(account?.description || '')
    const [isDescriptionShow, setIsDescriptionShow] = useToggle(!!account.description)
    const [isMobileMenuShow, setIsMobileMenuShow] = useToggle(false)


    const onSaveDescription = (ev) => {
        ev.preventDefault()
        console.log('desc');
        saveDescription(desc)
    }

    const handleChange = (ev) => {
        setDesc(ev.target.value)
    }

    const mediaQuery = window.matchMedia('(max-width: 760px)')

    const handleMediaQueryChange = (ev) => {
    //   console.log(ev.matches)
      setIsMobileMenuShow(false)
    }
  
    useEffect(() => {
      mediaQuery.addEventListener('change', handleMediaQueryChange)
  
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      }
    }, [])
  

    const descriptionForm = (<form onSubmit={onSaveDescription}>
        <input
            type="text"
            placeholder='Add board description'
            value={desc}
            name="desc"
            onChange={handleChange}
            onBlur={onSaveDescription} />
    </form>)

    return (
        <header className={`account-header header-set resp ${isScrolledToTop ? '' : 'scrolled'} flex align-center`}>
            <div className={`flex ${isScrolledToTop ? 'col' : 'align-center'}`}>
                <h1 className='title'>{account.title}</h1>
                <div className='account-description'>
                    {isDescriptionShow ?
                        <p className='description-txt' onClick={setIsDescriptionShow} >Main Table</p> : descriptionForm}
                        {/* <p className='description-txt' onClick={setIsDescriptionShow} >{account.description}</p> : descriptionForm} */}
                </div>
            </div>
            <Icon name="menu" classNames="btn solid menu-btn" handler={setIsMobileMenuShow} />
            <nav className={`${isMobileMenuShow? 'open floating-menu' : ''}`}>
                <button className='btn solid menu-item'>Activity</button>
                <button className='btn solid menu-item' onClick={toggleIsInviteShow} >Invite</button>
                <Link className='btn solid menu-item' to={`/account/${accountId}`} >Months</Link>
            </nav>
        </header>
    )
}