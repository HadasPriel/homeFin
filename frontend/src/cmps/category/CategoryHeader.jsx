import { CategoryTitle } from "./CategoryTitle"
import { SortSign } from "../ui/SortSign"


export const CategoryHeader = ({ updateCategoryTitle, setIsMenuShow, category}) => {

    return (
            <header className="flex">
                <div className="title-container flex align-center" >
                    <div className="menu flex center" onClick={setIsMenuShow} >
                        <SortSign color={`var(--${category.color})`} />
                    </div>
                    <CategoryTitle updateCategoryTitle={updateCategoryTitle} category={category} />
                </div>
            </header>
    )
}