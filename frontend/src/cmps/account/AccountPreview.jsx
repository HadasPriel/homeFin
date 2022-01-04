import { Link } from 'react-router-dom'

export const AccountPreview = ({ account }) => {


    return (
        <li className="account-preview">
            <Link to={`/account/${account._id}`}>
                {account.title}
            </Link>
        </li>
    )
}