import { ExpectedPreview } from "./ExpectedPreview"

export const CategorySummary = ({ expected, color, expensesSum, toggleEditExpected }) => {

    const width = (expensesSum / expected) * 100 || 0

    return (
        <section className="category-summary expense-preview flex row-container">
            {/* <div className="menu-wrapper flex center ">
                <div className="menu flex center sort-down" ></div>
            </div> */}
            <div className="expense-description first-cell flex align-center">
                <ExpectedPreview expected={expected} color={color} expensesSum={expensesSum} toggleEditExpected={toggleEditExpected} />
            </div>
            <div className="flex">
                <div className="repeated cell flex center"></div>
                <div className="expense-sum cell flex center">{expensesSum}</div>
                <div className="cell flex center"></div>
                <div className="cell flex center"></div>
                <div className="cell flex center"></div>
            </div>

        </section>
    )
}