import { CategoryHeader } from "./CategoryHeader"
import { CategoryColHeaders } from "./CategoryColHeaders"
import { CategoryFooter } from "./CategoryFooter"


export const CategoryMiniPreview = ({ category, cols, setIsMenuShow, setIsMiniPreview, updateCategoryTitle, onUpdateCategory }) => {

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
                        category={category} />
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