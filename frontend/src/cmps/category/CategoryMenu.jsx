import { useState } from "react"
import { CategoryColorList } from "./CategoryColorList"


export const CategoryMenu = ({ toggleCategoryMenu, onDeleteCategory, updateCategoryColor, toggleEditExpected }) => {

    const [isColorShow, setIsColorShow] = useState(false)

    const toggleIsColorShow = () => {
        setIsColorShow(prev => !prev)
    }


    return (
        <section className="category-menu" onMouseLeave={toggleCategoryMenu}>
            {/* <section className="category-menu" > */}
            <div className="change-color menu-item" onMouseEnter={toggleIsColorShow} onMouseLeave={toggleIsColorShow} >
                {isColorShow && <CategoryColorList updateCategoryColor={updateCategoryColor} />}
                Change color
            </div>
            <div className=" menu-item" onClick={toggleEditExpected}>Set expected monthly expense</div>
            <div className=" menu-item">Duplicate</div>
            <div className="delete menu-item" onClick={onDeleteCategory}>Delete</div>
        </section>
    )
}

