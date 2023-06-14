import { CategoryFooterList } from "./CategoryFooterList"

export const CategoryFooter = ({ category, toggleEditExpected, cols, onUpdateCategory }) => {

    return (
        <section className="category-footer expense-preview-wrapper">

            <section className="expense-preview flex row-container ">
                <section className="expense-description" ></section>
                <CategoryFooterList
                    cols={cols}
                    category={category}
                    toggleEditExpected={toggleEditExpected}
                    onUpdateCategory={onUpdateCategory} />
                <div className="last-cell cell flex center"></div>
            </section>
        </section>
    )
}