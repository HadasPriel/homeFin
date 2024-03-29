
import { useCallback } from "react"
import { AddExpense } from "../expense/AddExpense"
import { CategoryMenu } from "./CategoryMenu"
import { useToggle } from "../../hooks/useToggle.js"
import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"
import { CategoryFooter } from "./CategoryFooter"
import { CategoryMiniPreview } from "./CategoryMiniPreview"
import { ExpenseList } from "../expense/ExpenseList"


export const CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory, cols, updateCols, updateCurrency, updateLabel, removeLabel, dragHandleProps, currency }) => {

    const [isMenuShow, setIsMenuShow] = useToggle(false)
    const [isMiniPreview, setIsMiniPreview] = useToggle(false)

    const onAddExpense = (expense) => {
        const { isIncome } = category
        addExpense(category.id, expense, isIncome)
    }

    const onUpdateExpense = useCallback((expense) => {
        updateExpense(category.id, expense, category.isIncome)
    }, [category.id, category.isIncome, updateExpense])

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
        // console.log(newVal, field, categoryToSave[field] )
        updateCtegory(categoryToSave)
    }

    return (
        <section className="category-preview">
            {isMenuShow && <CategoryMenu
                toggleCategoryMenu={setIsMenuShow}
                onDeleteCategory={onDeleteCategory}
                updateCategoryColor={updateCategoryColor}
                color={category.color}
                isMiniPreview={isMiniPreview}
                setIsMiniPreview={setIsMiniPreview}
                isIncome={category.isIncome}
            />}

            {isMiniPreview ?
                // {isDragging || isMiniPreview ?
                <CategoryMiniPreview
                    category={category}
                    cols={cols}
                    setIsMenuShow={setIsMenuShow}
                    setIsMiniPreview={setIsMiniPreview}
                    onUpdateCategory={onUpdateCategory}
                    updateCategoryTitle={updateCategoryTitle}
                    dragHandleProps={dragHandleProps} />
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
                        cols={cols}
                        updateCols={updateCols} />

                    <ExpenseList
                        category={category}
                        updateExpense={onUpdateExpense}
                        deleteExpense={onDeleteExpense}
                        cols={cols}
                        currency={currency}
                        updateLabel={updateLabel}
                        removeLabel={removeLabel}
                        updateCtegory={updateCtegory} />

                    <AddExpense
                        addExpense={onAddExpense}
                        color={category.color} />

                    <CategoryFooter
                        category={category}
                        onUpdateCategory={onUpdateCategory}
                        updateCurrency={updateCurrency}
                        cols={cols}
                        currency={currency} />
                </div>
            }

        </section>
    )
}
