import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import actions from '../store/actions';

import { MonthList } from '../cmps/month/MonthList';
import { MonthDetails } from './MonthDetails';
import { AccountHeader } from '../cmps/account/AccountHeader';
import { AddMember } from '../cmps/account/AddMember';


export const AccountDetails = (props) => {
    let { accountId } = useParams();
    const dispatch = useDispatch();
    const account = useSelector(state => state.accountModule.currAcount)
    const [isInviteShow, setIsInviteShow] = useState(false);

    useEffect(() => {
        dispatch(actions.accountActions.loadAccount(accountId))
    }, [dispatch, accountId]);

    const toggleIsInviteShow = () => {
        setIsInviteShow(prevState => !prevState)
    }

    const toggleMember = (ev, member) => {
        dispatch(actions.accountActions.toggleMember(accountId, member))
    }

    if (!account) return <div>Loading...</div>
    return (
        <section className="account-details">
            <AccountHeader account={account} accountId={accountId} toggleIsInviteShow={toggleIsInviteShow} />
            <main>
                <Switch>
                    <Route path={`${props.match.path}/:monthId`} component={MonthDetails} />
                    <MonthList months={account.months} />
                </Switch>
            </main>
            {isInviteShow && <AddMember toggleMember={toggleMember} toggleIsInviteShow={toggleIsInviteShow} accountMembers={account.members} />}
        </section>
    )
}
