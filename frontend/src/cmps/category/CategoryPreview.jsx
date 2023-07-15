
import { useCallback } from "react"
import { AddExpense } from "../expense/AddExpense"
import { CategoryMenu } from "./CategoryMenu"
import { useToggle } from "../../hooks/useToggle"
import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"
import { CategoryFooter } from "./CategoryFooter"
import { CategoryMiniPreview } from "./CategoryMiniPreview"
import { ExpenseList } from "../expense/ExpenseList"


export const CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory, cols, updateLabel, removeLabel, dragHandleProps }) => {

    const [isMenuShow, setIsMenuShow] = useToggle(false)
    const [isMiniPreview, setIsMiniPreview] = useToggle(false)

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
        ev.preventDefault()
        const categoryToSave = { ...category }
        var field = ev.target.getAttribute('name')
        categoryToSave[field] = newVal
        updateCtegory(categoryToSave)
    }

    return (
        <section className="category-preview">
            {isMenuShow && <CategoryMenu
                toggleCategoryMenu={setIsMenuShow}
                onDeleteCategory={onDeleteCategory}
                updateCategoryColor={updateCategoryColor}
            />}

            {isMiniPreview ?
                <CategoryMiniPreview
                    category={category}
                    cols={cols}
                    setIsMenuShow={setIsMenuShow}
                    setIsMiniPreview={setIsMiniPreview}
                    onUpdateCategory={onUpdateCategory}
                    updateCategoryTitle={updateCategoryTitle} />
                :
                <div>
                    <CategoryHeader
                        dragHandleProps={dragHandleProps}
                        updateCategoryTitle={updateCategoryTitle}
                        setIsMenuShow={setIsMenuShow}
                        setIsMiniPreview={setIsMiniPreview}
                        category={category} />

                    <CategoryColHeaders
                        color={category.color}
                        cols={cols} />

                    <ExpenseList category={category}
                        updateExpense={onUpdateExpense}
                        deleteExpense={onDeleteExpense}
                        cols={cols}
                        updateLabel={updateLabel}
                        removeLabel={removeLabel}
                        updateCtegory={updateCtegory} />

                    <AddExpense
                        addExpense={onAddExpense}
                        color={category.color} />

                    <CategoryFooter
                        category={category}
                        onUpdateCategory={onUpdateCategory}
                        cols={cols} />
                </div>
            }

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