import { CategoryTitle } from "./CategoryTitle"
import { SortSign } from "../ui/SortSign"


export const CategoryHeader = ({ updateCategoryTitle, setIsMenuShow, setIsMiniPreview, category }) => {

    return (
        <header className="flex">
            <div className="menu-sign flex center" onClick={setIsMenuShow} ></div>
            <div className="title-container flex align-center" >
                <div className="sort-sign flex center" onClick={setIsMiniPreview}  >
                    <SortSign color={`var(--${category.color})`} />
                </div>
                <CategoryTitle updateCategoryTitle={updateCategoryTitle} category={category} />
            </div>
        </header>
    )
}