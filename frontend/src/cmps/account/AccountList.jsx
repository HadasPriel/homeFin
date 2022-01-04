import { AccountPreview } from "./AccountPreview"

export const AccountList = ({ accounts }) => {

    return (
        <ul className="account-list flex">
            <p>account-list:</p>
            {accounts.map(account => <AccountPreview account={account} key={account._id} />)}
        </ul>
    )
}