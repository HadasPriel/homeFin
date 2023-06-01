// import { ExpenseColSum } from "./ExpenseColSum";
// import { ExpenseColUser } from "./ExpenseColUser";
// import { ExpenseColDate } from "./ExpenseColDate";
import { CategoryLabelFooter } from "./CategoryLabelFooter";
import { CategorySumFooter } from "./CategorySumFooter";

export const CategoryFooterList = ({ cols, category, toggleEditExpected }) => {

    const expensesSum = category.expenses.reduce((acc, expense) => {
        return acc + expense.sum.amount
    }, 0)

    return (
        <section className="col-list">
            {cols.map(col => {
                switch (col) {
                    case 'sum':
                        return <CategorySumFooter expected={category.expected} color={category.color} expensesSum={expensesSum} toggleEditExpected={toggleEditExpected} key={col} />
                    case 'labels':
                        return <CategoryLabelFooter category={category} key={col} />
                    default:
                        return <div className="cell" key={col}></div>
                }
            })}
        </section>
    )
}

