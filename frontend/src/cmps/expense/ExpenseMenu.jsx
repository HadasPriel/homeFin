import { Icon } from "../ui/Icon";


export const ExpenseMenu = ({ toggleExpenseMenu, onDeleteExpense, expenseDescription }) => {

    const onCopyName = () => {
        navigator.clipboard.writeText(expenseDescription)
        toggleExpenseMenu()
    }

    return (
        <section className="expense-menu floating-menu" onMouseLeave={toggleExpenseMenu}>
            <div className="menu-item" onClick={onCopyName} >
                <Icon name="text" />
                <span>Copy name</span>
            </div>
            <div className="menu-item" >
                <Icon name="open" />
                <span>Open</span>
            </div>
            <div className="delete menu-item" onClick={onDeleteExpense}>
                <Icon name="delete" />
                <span>Delete</span>
            </div>
        </section>
    )
}

