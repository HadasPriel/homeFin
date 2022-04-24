import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { useToggle } from '../hooks/useToggle';

import actions from '../store/actions';

import { MonthList } from '../cmps/month/MonthList';
import { MonthDetails } from './MonthDetails';
import { AccountHeader } from '../cmps/account/AccountHeader';
import { AddMember } from '../cmps/account/AddMember';


export const AccountDetails = (props) => {
    let { accountId } = useParams();
    const dispatch = useDispatch();
    const account = useSelector(state => state.accountModule.currAcount)
    const [isInviteShow, setIsInviteShow] = useToggle(false);

    useEffect(() => {
        dispatch(actions.accountActions.loadAccount(accountId))
    }, [dispatch, accountId]);


    const toggleMember = (ev, member) => {
        dispatch(actions.accountActions.toggleMember(accountId, member))
    }

    const saveDescription = (description) => {
        dispatch(actions.accountActions.saveDescription(accountId, description))
    }
    

    if (!account) return <div>Loading...</div>
    return (
        <section className="account-details">
            <AccountHeader account={account} accountId={accountId} toggleIsInviteShow={setIsInviteShow} saveDescription={saveDescription} />
            <main>
                <Switch>
                    <Route path={`${props.match.path}/:monthId`} component={MonthDetails} />
                    <MonthList months={account.months} />
                </Switch>
            </main>
            {isInviteShow && <AddMember toggleMember={toggleMember} toggleIsInviteShow={setIsInviteShow} accountMembers={account.members} />}
        </section>
    )
}
