import { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { Link } from 'react-router-dom'


export const AccountHeader = ({ account, accountId, toggleIsInviteShow, saveDescription }) => {

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
        <header className='account-header'>
            <main className='header-set'>
                <h1 className='title'>{account.title}</h1>
                <nav>
                    <button className='btn solid' onClick={toggleIsInviteShow} >Invite</button>
                    <button className='btn solid'>Activity</button>
                    <Link className='btn solid' to={`/account/${accountId}`} >Months</Link>
                    <button className='btn solid menu-sign' ></button>
                </nav>
            </main>
            <div className='account-description'>
                {isDescriptionShow ? <p className='description-txt' onClick={setIsDescriptionShow} >{account.description}</p> : descriptionForm}
            </div>

        </header>
    )
}
