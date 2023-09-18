import { CategoryFooterList } from "./CategoryFooterList"

export const CategoryFooter = ({ category, toggleEditExpected, cols, onUpdateCategory, currency, updateCurrency }) => {

    return (
        <section className="category-footer expense-preview-wrapper">

            <section className="expense-preview flex row-container ">
                <section className="expense-description" ></section>
                <CategoryFooterList
                    category={category}
                    cols={cols}
                    currency={currency}
                    updateCurrency={updateCurrency}
                    toggleEditExpected={toggleEditExpected}
                    onUpdateCategory={onUpdateCategory} />
                <div className="last-cell cell flex center"></div>
            </section>
        </section>
    )
}