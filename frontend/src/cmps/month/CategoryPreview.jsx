
import { forwardRef, useCallback } from "react";

import { AddExpense } from "./AddExpense"
import { ExpensePreview } from "./ExpensePreview"


const _CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory }, ref) => {

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
        const categoryToSave = { ...category }
        categoryToSave.title = ev.target.innerText
        updateCtegory(categoryToSave)
    }

    // const handleFocus = (ev) => {
    //     ev.target.select()

    // }

    return (
        <section className="category-preview">
            <header className="flex row-container">
                <div className="menu-wrapper flex center">
                    <div className="menu flex center" onClick={onDeleteCategory}></div>
                </div>
                <div className="first-cell first-cell-title flex" >
                    <h1 className="flex align-center"
                        suppressContentEditableWarning={true}
                        contentEditable
                        onBlur={updateCategoryTitle}
                        ref={ref} >{category.title}</h1>
                </div>
                <div className="headers flex">
                    <div className="cell flex center">Comments</div>
                    <div className="cell flex center">Sum</div>
                    <div className="cell flex center">Labels</div>
                    <div className="cell flex center">Date</div>
                    <div className="cell flex center">Person</div>
                </div>

            </header>
            {/* {category.description && <p>{category.description}</p>} */}


            {category.expenses.map(expense => <ExpensePreview
                key={expense.id}
                expense={expense}
                updateExpense={onUpdateExpense}
                deleteExpense={onDeleteExpense} />)}
            <AddExpense addExpense={onAddExpense} />
            <p>expacted: {category.expacted}</p>
        </section>
    )
}

// export const CategoryPreview = forwardRef((props, ref) => _CategoryPreview({ ...props, ref }));
export const CategoryPreview = forwardRef(_CategoryPreview);
