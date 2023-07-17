import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"
import { CategoryFooter } from "./CategoryFooter"


export const CategoryMiniPreview = ({ category, cols, setIsMenuShow, setIsMiniPreview, updateCategoryTitle, onUpdateCategory, dragHandleProps }) => {

    let budgetNum = category.expenses.length || 'No'
    let budgetTxt = (budgetNum === 1) ? 'Budget' : 'Budgets'

    return (
        <section className="category-mini-preview">
            <div className="flex" >
                <span className="before-row" style={{ backgroundColor: `var(--${category.color})` }} ></span>
                <div className="mini-title">

                    <CategoryHeader
                        updateCategoryTitle={updateCategoryTitle}
                        setIsMenuShow={setIsMenuShow}
                        setIsMiniPreview={setIsMiniPreview}
                        category={category}
                        dragHandleProps={dragHandleProps} />
                    <p className="budget-num">{budgetNum} {budgetTxt}</p>

                </div>
                <div className="mini-table">

                    <CategoryColHeaders
                        color={category.color}
                        cols={cols} />
                    <CategoryFooter
                        category={category}
                        onUpdateCategory={onUpdateCategory}
                        cols={cols} />

                </div>
            </div>

        </section>
    )
}