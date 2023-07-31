
import { useCallback } from "react"
import { AddExpense } from "../expense/AddExpense"
import { CategoryMenu } from "./CategoryMenu"
import { useToggle } from "../../hooks/useToggle"
import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"
import { CategoryFooter } from "./CategoryFooter"
import { CategoryMiniPreview } from "./CategoryMiniPreview"
import { ExpenseList } from "../expense/ExpenseList"


export const CategoryPreview = ({ category, addExpense, updateExpense, deleteExpense, updateCtegory, deleteCategory, cols, updateCols, updateLabel, removeLabel, dragHandleProps }) => {

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
