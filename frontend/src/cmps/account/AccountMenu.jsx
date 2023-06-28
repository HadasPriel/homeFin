import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../store/actions';

import { Icon } from '../ui/Icon'

export const AccountMenu = ({ setIsMenuShow }) => {

    const accounts = useSelector(state => state.accountModule.accounts)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.accountActions.loadAccounts())
    }, [dispatch]);


    return (
        <section className={`account-menu`} >
            <button className="collapse-btn" onClick={setIsMenuShow} >
                <Icon name="arrow" />
            </button>

            <main className='content'>
                <div className='workspace flex align-center' >
                    <div className='workspace-letter flex center' >
                        <span>M</span>
                    </div>
                    <h4 className='workspace-title' >Main workspace</h4>
                </div>

                <div className='workspace-menu' >
                    <div className='item' >
                        <Icon name="add" />
                        <p>Add</p>
                    </div>
                    {/* <div className='item' >
                        <p>Filter</p>
                    </div> */}
                    <div className='item' >
                        <Icon name="search" />
                        <p>Search</p>
                    </div>
                </div>

                <div className='spacer' ></div>

                <ul className='workspace-menu'>
                    {accounts.map(account => <li className='item flex align-center' key={account._id}> <Icon name="board" /><span> {account.title}</span></li>)}
                </ul>
            </main>

        </section>
    )
}

