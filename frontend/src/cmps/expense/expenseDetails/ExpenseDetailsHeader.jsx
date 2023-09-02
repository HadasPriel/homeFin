import { useHistory } from 'react-router-dom'
import { useToggle } from '../../../hooks/useToggle'
import { UserImg } from '../../ui/UserImg'
import { Icon } from '../../ui/Icon'
import { ExpenseMenu } from './ExpenseMenu'


export const ExpenseDetailsHeader = ({ description, byUser, setTab, currTab, deleteExpense, updateExpense }) => {

    const history = useHistory()
    const [isMenuShow, setIsMenuShow] = useToggle(false)

    const tabs = [
        { val: 'comments', title: 'Updates' },
        { val: 'files', title: 'Files' },
        { val: 'activityLog', title: 'Activity log' }
    ]

    const onTab = (ev) => {
        setTab(ev.target.value)
    }

    const goBack = () => {
        history.goBack()
    }

    const onUpdateExpense = (ev) => {
        updateExpense(ev.target.innerText)
    }

    return (
        <header className="expense-details-header" >
            <div>
                <button className="close btn solid flex center" onClick={goBack} > <Icon name="x" /> </button>
            </div>
            <div className="header-set">
                <h1 className="title"
                    contentEditable="true"
                    name="description"
                    onBlur={onUpdateExpense}
                    suppressContentEditableWarning={true} >
                    {description}
                </h1>
                <div className="flex" >
                    <button className="flex" > <UserImg user={byUser} /> </button>
                    <button className="btn solid menu-btn" onClick={setIsMenuShow} >
                        {isMenuShow && <ExpenseMenu deleteExpense={deleteExpense} toggleMenu={setIsMenuShow} />}
                        <Icon name="menu" />
                    </button>
                </div>
            </div>
            <div className="expense-details-nav flex" >
                {tabs.map(tab =>
                    <label className="nav-item" key={tab.val}>
                        <input type="radio" name="tab" value={tab.val} onInput={onTab} hidden />
                        <span>{tab.title}</span>
                        {(currTab === tab.val) && <div className='active-border'></div>}
                    </label>
                )}
            </div>
        </header>

    )
}


