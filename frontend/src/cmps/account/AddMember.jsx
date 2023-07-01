import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../store/actions';
import { Screen } from '../ui/Screen';
import { UserPreviewSmall } from '../ui/user-preview-small';


export const AddMember = ({ toggleMember, toggleIsInviteShow, accountMembers }) => {
    const users = useSelector(state => state.userModule.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.userActions.loadUsers())
    }, [dispatch]);

    const filterMembers = () => {
        console.log('filter...');
    }

    return (
        <section>
            <Screen func={toggleIsInviteShow} />
            <section className="add-member">
                <span className='x inherit btn solid' onClick={toggleIsInviteShow} ></span>
                <h2 className='title' >Board Members</h2>
                <input
                    className='filter'
                    type="text"
                    placeholder="Enter user name or full name"
                    onInput={filterMembers}
                />

                {users && <ul className="list-container">
                    {users.map(user => {
                        return <UserPreviewSmall user={user} func={toggleMember} accountMembers={accountMembers} key={user._id} />
                    })}

                </ul>}
            </section>
        </section>
    )
}