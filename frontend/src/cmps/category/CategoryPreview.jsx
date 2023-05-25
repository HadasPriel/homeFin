
import { useCallback } from "react"
import { AddExpense } from "../expense/AddExpense"
import { ExpensePreview } from "../expense/ExpensePreview"
import { EditExpected } from "./EditExpected"
import { CategoryMenu } from "./CategoryMenu"
import { useToggle } from "../../hooks/useToggle"
import { CategorySummary } from "./CategorySummary"
import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"



export const CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory, cols, updateLabel, removeLabel }) => {

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

    const updateCategoryTitle = (title) => {
        const categoryToSave = { ...category }
        categoryToSave.title = title
        updateCtegory(categoryToSave)
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

    return (
        <section className="category-preview">
            {isMenuShow && <CategoryMenu
                toggleCategoryMenu={setIsMenuShow}
                onDeleteCategory={onDeleteCategory}
                updateCategoryColor={updateCategoryColor}
                toggleEditExpected={setIsEditExpectedShow}
            />}

            <CategoryHeader 
                updateCategoryTitle={updateCategoryTitle} 
                setIsMenuShow={setIsMenuShow} 
                category={category} />

            <CategoryColHeaders 
                color={category.color} 
                cols={cols} />

            {category.expenses.map(expense => <ExpensePreview
                color={category.color}
                key={expense.id}
                expense={expense}
                updateExpense={onUpdateExpense}
                deleteExpense={onDeleteExpense}
                cols={cols}
                updateLabel={updateLabel}
                removeLabel={removeLabel} />)}

            <AddExpense
                addExpense={onAddExpense}
                color={category.color} />

            {isEditExpectedShow && <EditExpected
                expected={category.expected}
                color={category.color}
                onUpdateCategory={onUpdateCategory}
                toggleEditExpected={setIsEditExpectedShow} />}

            <CategorySummary
                category={category}
                toggleEditExpected={setIsEditExpectedShow}
                cols={cols} />

        </section>
    )
}





















{/* <header className="category-header flex row-container">
                <div className="flex header-start" >
                    <div className="menu-wrapper flex center" >
                        <div className="sort-down menu flex center" onClick={setIsMenuShow} style={menuStyle}></div>
                    </div>
                    <CategoryTitle updateCategoryTitle={updateCategoryTitle} category={category} />
                </div>
                <div className="headers flex">
                    {cols.map(col => <div className="cell flex center categ-title" key={col} >{col}</div>)}
                </div>
            </header>
            <main className="category-preview-main" >
                {category.expenses.map(expense => <ExpensePreview
                    color={category.color}
                    key={expense.id}
                    expense={expense}
                    updateExpense={onUpdateExpense}
                    deleteExpense={onDeleteExpense}
                    cols={cols}
                    updateLabel={updateLabel}
                    removeLabel={removeLabel} />)}
                <AddExpense
                    addExpense={onAddExpense}
                    color={category.color} />
                {isEditExpectedShow && <EditExpected
                    expected={category.expected}
                    color={category.color}
                    onUpdateCategory={onUpdateCategory}
                    toggleEditExpected={setIsEditExpectedShow} />}
                <CategorySummary
                    category={category}
                    toggleEditExpected={setIsEditExpectedShow}
                    cols={cols} />
            </main> */}