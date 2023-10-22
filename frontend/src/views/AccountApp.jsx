import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions';
import { dataService } from '@/services/data.service.js'
import { AccountList } from '../cmps/account/AccountList';


export const AccountApp = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accountModule.accounts)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const templates = dataService.getAccountTemplates()

    useEffect(() => {
        dispatch(actions.accountActions.loadAccounts())
    }, [dispatch, loggedInUser]);

    const addAccount = (account) => {
        console.log('add');
        dispatch(actions.accountActions.addAccount(account))
    }


    return (
        <section>
            <AccountList title={'Boards'} accounts={accounts} addAccount={addAccount} />
            <AccountList title={'Templates'} accounts={templates} />
        </section>
    )
}