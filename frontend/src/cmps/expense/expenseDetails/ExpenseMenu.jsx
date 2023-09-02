import { Icon } from "../../ui/Icon"


export const ExpenseMenu = ({ deleteExpense, toggleMenu }) => {


    const onCopyLink = (ev) => {
        navigator.clipboard.writeText(window.location.href)
        toggleMenu()
        ev.stopPropagation()
    }

    return (
        <section className="expense-details-menu floating-menu" onMouseLeave={toggleMenu}>
            <div className="menu-item" onClick={onCopyLink} >
                <Icon name="text" />
                <span>Copy item link</span>
            </div>
            <div className="delete menu-item" onClick={deleteExpense}>
                <Icon name="delete" />
                <span>Delete</span>
            </div>
        </section>
    )
}

