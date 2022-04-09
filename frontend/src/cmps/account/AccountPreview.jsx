import { Link } from 'react-router-dom'

export const AccountPreview = ({ account }) => {


    return (
        <li className="account-preview">
            <Link to={`/account/${account._id}`}  >
                <div className='account-preview-container flex space-between align-center'>
                    <h2 className="account-title board">{account.title}</h2>
                    <span className='star'></span>
                </div>
            </Link>
            <div className='saparator'></div>
        </li>
    )
}