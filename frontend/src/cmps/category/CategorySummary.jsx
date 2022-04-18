import { CategoryLabelSummary } from "./CategoryLabelSummary"
import { ExpectedPreview } from "./ExpectedPreview"

export const CategorySummary = ({ category, toggleEditExpected, cols }) => {


    const expensesSum = category.expenses.reduce((acc, expense) => {
        return acc + expense.sum.amount
    }, 0)


    return (
        <section className="category-summary expense-preview flex row-container">
            <div className="expense-description first-cell flex align-center">
                <ExpectedPreview expected={category.expected} color={category.color} expensesSum={expensesSum} toggleEditExpected={toggleEditExpected} />
            </div>
            <div className="flex">
                {cols.map(col => {
                    switch (col) {
                        case 'sum':
                            return <div key={col} className="expense-sum cell flex center">{expensesSum}</div>
                        case 'labels':
                            return <CategoryLabelSummary key={col} category={category} />
                        default:
                            return <div key={col} className="cell flex center"></div>
                    }
                })}


            </div>

        </section>
    )
}