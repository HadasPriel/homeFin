import { CategoryTitle } from "./CategoryTitle"
// import { SortSign } from "../ui/SortSign"
import { Icon } from "../ui/Icon"


export const CategoryHeader = ({ updateCategoryTitle, setIsMenuShow, setIsMiniPreview, category, dragHandleProps }) => {

    return (
        <header className="flex" {...dragHandleProps}>
            <Icon name="menu" handler={setIsMenuShow} />
            <div className="title-container flex align-center" >
                <div className="sort-sign flex center" onClick={setIsMiniPreview}  style={{ color: `var(--${category.color})` }} >
                    <Icon name="arrow" color={`var(--${category.color})`} />
                    {/* <SortSign color={`var(--${category.color})`} /> */}
                </div>
                <CategoryTitle updateCategoryTitle={updateCategoryTitle} category={category} />
            </div>
        </header>
    )
}