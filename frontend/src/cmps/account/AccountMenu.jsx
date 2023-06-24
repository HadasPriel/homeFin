import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../store/actions';

export const AccountMenu = ({ setIsMenuShow }) => {

    const accounts = useSelector(state => state.accountModule.accounts)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.accountActions.loadAccounts())
    }, [dispatch]);


    return (
        <section className={`account-menu`} >
            <button className="collapse-btn" onClick={setIsMenuShow} ></button>

            <main className='content'>

                <div className='workspace flex align-center' >
                    <div className='workspace-letter flex center' >
                        <span>M</span>
                    </div>
                    <h4 className='workspace-title' >Main workspace</h4>
                </div>

                <div className='workspace-menu' >
                    <div className='item' >
                        <p>Add</p>
                    </div>
                    {/* <div className='item' >
                    <p>Filter</p>
                </div> */}
                    <div className='item' >
                        <p>Search</p>
                    </div>
                </div>

                <div className='spacer' ></div>

                <ul className='workspace-menu'>
                    {accounts.map(account => <li className='item' key={account._id}>{account.title}</li>)}
                </ul>
            </main>

        </section>
    )
}

