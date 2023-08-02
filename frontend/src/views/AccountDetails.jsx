import React, { useEffect, useState, useRef } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useToggle } from '../hooks/useToggle'

import actions from '../store/actions'

import { MonthList } from '../cmps/month/MonthList'
import { MonthDetails } from './MonthDetails'
import { AccountHeader } from '../cmps/account/AccountHeader'
import { AddMember } from '../cmps/account/AddMember'
import { AccountMenu } from '../cmps/account/AccountMenu'
import { ExpenseDetails } from './ExpenseDetails'

export const AccountDetails = (props) => {
    let { accountId } = useParams()
    const dispatch = useDispatch()
    const account = useSelector(state => state.accountModule.currAcount)

    const [isInviteShow, setIsInviteShow] = useToggle(false)
    const [isMenuShow, setIsMenuShow] = useToggle(false)

    useEffect(() => {
        dispatch(actions.accountActions.loadAccount(accountId))
    }, [dispatch, accountId]);

    const toggleMember = (ev, member) => {
        dispatch(actions.accountActions.toggleMember(accountId, member))
    }

    const saveDescription = (description) => {
        dispatch(actions.accountActions.saveDescription(accountId, description))
    }

    //scroll:
    const [isScrolledToTop, setIsScrolledToTop] = useState(true)
    const elAccountDetails = useRef(null)

    const handleScroll = () => {
        const isCurrScrolledToTop = elAccountDetails.current.scrollTop === 0
        setIsScrolledToTop(isCurrScrolledToTop)
    }

    useEffect(() => {
        var currElDetails = elAccountDetails.current
        if (currElDetails) {
            currElDetails.addEventListener('scroll', handleScroll)

            return () => {
                currElDetails.removeEventListener('scroll', handleScroll)
            };
        }
    }, [account])


    if (!account) return <div>Loading...</div>
    return (
        <main className='account-layout'>
            <section className={`account-details-wrapper flex ${isMenuShow ? 'menu-show' : ''}`} >
                {/* <section className={`account-details-wrapper flex ${isMenuShow ? 'menu-show' : ''} ${expenseId ? 'expense-details-show' : ''}`} > */}
                <AccountMenu
                    account={account}
                    setIsMenuShow={setIsMenuShow} />
                
                <section className='account-details-scroll'
                    ref={elAccountDetails} >
                    <div className={`account-details`}>
                        <div className='side-wrapper' ></div>
                        <div className='top-wrapper' ></div>

                        <AccountHeader
                            account={account}
                            accountId={accountId}
                            toggleIsInviteShow={setIsInviteShow}
                            saveDescription={saveDescription}
                            isScrolledToTop={isScrolledToTop} />

                        <main className="main-account-details" >
                            <Switch>
                                <Route path={`${props.match.path}/:monthId`} component={MonthDetails} />
                                <MonthList months={account.months} />
                            </Switch>
                        </main>
                        {isInviteShow && <AddMember toggleMember={toggleMember} toggleIsInviteShow={setIsInviteShow} accountMembers={account.members} />}
                    </div>
                </section>
                <Switch>
                    <Route path={`${props.match.path}/:monthId/:expenseId`} > <ExpenseDetails /> </Route>
                </Switch>
            </section>
        </main>
    )
}
