import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions';

import { AccountList } from '../cmps/account/AccountList';


export const AccountApp = () => {
    const dispatch = useDispatch();
    // const [account, setAccount] = useState(null);

    useEffect(() => {
        dispatch(actions.accountActions.loadAccounts())
    }, [dispatch]);

    const accounts = useSelector(state => state.accountModule.accounts)

    return (
        <section>
            <AccountList accounts={accounts} />
        </section>
    )
}
