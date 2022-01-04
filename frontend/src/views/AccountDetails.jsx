import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import actions from '../store/actions';

import { MonthList } from '../cmps/month/MonthList';
import { MonthDetails } from './MonthDetails';


export const AccountDetails = (props) => {
    let { accountId } = useParams();
    const dispatch = useDispatch();
    const account = useSelector(state => state.accountModule.currAcount)

    useEffect(() => {
        dispatch(actions.accountActions.loadAccount(accountId))
    }, [dispatch, accountId]);

    if (!account) return <div>Loading...</div>
    return (
        <section className="account-details">
            <header className='account-header'>
                <main className='header-set'>
                    <h1 className='title'>{account.title}</h1>
                    <nav>
                        <button className='btn solid'>Invite</button>
                        <button className='btn solid'>Activity</button>
                        <Link className='btn solid' to={`/account/${accountId}`} >Months</Link>
                        <button className='btn solid menu-sign' ></button>
                    </nav>
                </main>
                <p className='description'>{account.description}</p>

            </header>
            <main>
                <Switch>
                    <Route path={`${props.match.path}/:monthId`} component={MonthDetails} />
                    <MonthList months={account.months} />
                </Switch>
            </main>

        </section>
    )
}
