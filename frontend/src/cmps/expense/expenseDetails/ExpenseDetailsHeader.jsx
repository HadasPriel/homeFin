import { Icon } from '../../ui/Icon'
import { UserImg } from '../../ui/UserImg'


export const ExpenseDetailsHeader = ({ description, byUser, setTab, currTab }) => {


    const tabs = [
        { val: 'comments', title: 'Updates' },
        { val: 'files', title: 'Files' },
        { val: 'activityLog', title: 'Activity log' }
    ]

    const onTab = (ev) => {
        setTab(ev.target.value)
    }


    return (
        <header className="expense-details-header" >
            <div>
                <button className="close btn solid flex center" > <Icon name="x" /> </button>
            </div>
            <div className="header-set">
                <h1 className="title" >{description}</h1>
                <div className="flex" >
                    <button className="flex" > <UserImg user={byUser} /> </button>
                    <button> <Icon name="menu" /> </button>
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


