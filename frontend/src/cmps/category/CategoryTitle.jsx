
import { useToggle } from "../../hooks/useToggle.js"
import { CategoryTitleEdit } from "./CategoryTitleEdit"



export const CategoryTitle = ({ updateCategoryTitle, category }) => {
    const [isEditTitleShow, setIsEditTitleShow] = useToggle(false)

    const updateTitle = (title) => {
        if (category.title !== title) updateCategoryTitle(title)
        setIsEditTitleShow()
    }


    return (
        <section className="first-cell first-cell-title flex">
            {isEditTitleShow ? <CategoryTitleEdit updateTitle={updateTitle} categoryTitle={category.title} color={category.color} /> :
                <h1 onClick={setIsEditTitleShow} className="category-title-txt flex align-center"
                    style={{ color: `var(--${category.color})` }}
                    name="title"
                >{category.title}</h1>}
        </section>
    )
}

