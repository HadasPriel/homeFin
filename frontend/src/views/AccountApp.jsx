import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions';

import { AccountList } from '../cmps/account/AccountList';


export const AccountApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.accountActions.loadAccounts())
    }, [dispatch]);

    const addAccount = (account) => {
        console.log('add');
        dispatch(actions.accountActions.addAccount(account))
    }

    const accounts = useSelector(state => state.accountModule.accounts)

    return (
        <section>
            <AccountList accounts={accounts} addAccount={addAccount} />
        </section>
    )
}
