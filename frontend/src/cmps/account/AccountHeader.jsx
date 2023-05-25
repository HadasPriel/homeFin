import { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { Link } from 'react-router-dom'


export const AccountHeader = ({ account, accountId, toggleIsInviteShow, saveDescription, isScrolledToTop }) => {

    const [desc, setDesc] = useState(account?.description || '')
    const [isDescriptionShow, setIsDescriptionShow] = useToggle(!!account.description)


    const onSaveDescription = (ev) => {
        ev.preventDefault()
        console.log('desc');
        saveDescription(desc)
    }

    const handleChange = (ev) => {
        setDesc(ev.target.value)
    }

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
        <header className={`account-header header-set ${isScrolledToTop? '' : 'scrolled'}`}>
            {/* <main className='header-set'> */}
                <div className={`flex ${isScrolledToTop? 'col' : 'align-center'}`}>
                    <h1 className='title'>{account.title}</h1>
                    <div className='account-description'>
                        {isDescriptionShow ? 
                        <p className='description-txt' onClick={setIsDescriptionShow} >{account.description}</p> : descriptionForm}
                    </div>
                </div>
                <nav className='align-self'>
                    <button className='btn solid'>Activity</button>
                    <button className='btn solid' onClick={toggleIsInviteShow} >Invite</button>
                    <Link className='btn solid' to={`/account/${accountId}`} >Months</Link>
                    <button className='btn solid menu-sign' ></button>
                </nav>
            {/* </main> */}

        </header>
    )
}
