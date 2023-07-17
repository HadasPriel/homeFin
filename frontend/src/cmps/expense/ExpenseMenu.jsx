


export const ExpenseMenu = ({ toggleExpenseMenu, onDeleteExpense, expenseDescription }) => {

    const onCopyName = () => {
        navigator.clipboard.writeText(expenseDescription)
        toggleExpenseMenu()
    }

    return (
        <section className="expense-menu floating-menu" onMouseLeave={toggleExpenseMenu}>
            <div className="delete menu-item" onClick={onDeleteExpense}>Delete</div>
            <div className="menu-item" onClick={onCopyName} >Copy name</div>
            <div className="menu-item" >Open</div>
        </section>
    )
}

