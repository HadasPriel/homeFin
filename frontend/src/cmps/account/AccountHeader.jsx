import { Link } from 'react-router-dom'


export const AccountHeader = ({ account, accountId, toggleIsInviteShow }) => {

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
            <p className='description'>{account.description}</p>

        </header>
    )
}
