
import { AccountPreview } from "./AccountPreview"
import { AddAccount } from "./AddAccount"

export const AccountList = ({ accounts, addAccount }) => {



    return (
        <section className="account-list">
            <h2 className="title">Boards</h2>
            <ul className="list-container">
                {accounts.map(account =>
                    <AccountPreview account={account} key={account._id} />)
                }
                <AddAccount addAccount={addAccount} />
            </ul>
        </section>
    )
}