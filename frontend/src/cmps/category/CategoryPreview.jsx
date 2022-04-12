
import { forwardRef, useCallback } from "react";
import { AddExpense } from "../expense/AddExpense"
import { ExpensePreview } from "../expense/ExpensePreview"
import { EditExpected } from "./EditExpected";
import { CategoryMenu } from "./CategoryMenu"
import { ExpectedPreview } from "./ExpectedPreview";
import { useToggle } from "../../hooks/useToggle";



const _CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory }, ref) => {

    const [isMenuShow, setIsMenuShow] = useToggle(false)
    const [isEditExpectedShow, setIsEditExpectedShow] = useToggle(false)

    const onAddExpense = (expense) => {
        addExpense(category.id, expense)
    }

    const onUpdateExpense = useCallback((expense) => {
        updateExpense(category.id, expense)
    }, [category.id, updateExpense])


    const onDeleteExpense = (expenseId) => {
        deleteExpense(category.id, expenseId)
    }

    const onDeleteCategory = () => {
        deleteCategory(category.id)
    }

    const updateCategoryTitle = (ev) => {
        let newVal = ev.target.innerText
        onUpdateCategory(ev, newVal)
    }

    const updateCategoryColor = (ev) => {
        const categoryToSave = { ...category }
        var color = ev.target.getAttribute('name')
        categoryToSave.color = color
        updateCtegory(categoryToSave)
        setIsMenuShow()
    }

    const onUpdateCategory = (ev, newVal) => {
        const categoryToSave = { ...category }
        var field = ev.target.getAttribute('name')
        categoryToSave[field] = newVal
        updateCtegory(categoryToSave)
        setIsEditExpectedShow(false)
    }

    const expensesSum = category.expenses.reduce((acc, expense) => {
        return acc + expense.sum.amount
    }, 0)


    const menuStyle = {
        backgroundColor: `var(--${category.color})`
    }

    return (
        <section className="category-preview">
            {isMenuShow && <CategoryMenu
                toggleCategoryMenu={setIsMenuShow}
                onDeleteCategory={onDeleteCategory}
                updateCategoryColor={updateCategoryColor}
                toggleEditExpected={setIsEditExpectedShow}
            />}
            <header className="flex row-container">
                <div className="menu-wrapper flex center" >
                    <div className="sort-down menu flex center" onClick={setIsMenuShow} style={menuStyle}></div>
                </div>
                <div className="first-cell first-cell-title flex" >
                    <h1 className="flex align-center"
                        style={{ color: `var(--${category.color})` }}
                        suppressContentEditableWarning={true}
                        contentEditable
                        name="title"
                        onBlur={updateCategoryTitle}
                        ref={ref}
                    >{category.title}</h1>
                </div>
                <div className="headers flex">
                    <div className="cell flex center">Repeated</div>
                    <div className="cell flex center">Sum</div>
                    <div className="cell flex center">Labels</div>
                    <div className="cell flex center">Date</div>
                    <div className="cell flex center">Person</div>
                </div>

            </header>


            {category.expenses.map(expense => <ExpensePreview
                color={category.color}
                key={expense.id}
                expense={expense}
                updateExpense={onUpdateExpense}
                deleteExpense={onDeleteExpense} />)}
            <AddExpense addExpense={onAddExpense} color={category.color} />
            {isEditExpectedShow && <EditExpected expected={category.expected} color={category.color} onUpdateCategory={onUpdateCategory} toggleEditExpected={setIsEditExpectedShow} />}
            <ExpectedPreview expected={category.expected} color={category.color} expensesSum={expensesSum} toggleEditExpected={setIsEditExpectedShow} />
        </section>
    )
}

export const CategoryPreview = forwardRef(_CategoryPreview);
