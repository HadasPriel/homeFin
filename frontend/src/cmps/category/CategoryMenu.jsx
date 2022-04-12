import { useToggle } from "../../hooks/useToggle"
import { CategoryColorList } from "./CategoryColorList"


export const CategoryMenu = ({ toggleCategoryMenu, onDeleteCategory, updateCategoryColor, toggleEditExpected }) => {

    const [isColorShow, setIsColorShow] = useToggle(false)

    const toggleMenueAndExpected = () => {
        toggleEditExpected()
        toggleCategoryMenu()
    }

    return (
        <section className="category-menu" onMouseLeave={toggleCategoryMenu}>
            {/* <section className="category-menu" > */}
            <div className="change-color menu-item" onMouseEnter={setIsColorShow} onMouseLeave={setIsColorShow} >
                {isColorShow && <CategoryColorList updateCategoryColor={updateCategoryColor} />}
                Change color
            </div>
            <div className=" menu-item" onClick={toggleMenueAndExpected}>Set expected monthly expense</div>
            <div className=" menu-item">Duplicate</div>
            <div className="delete menu-item" onClick={onDeleteCategory}>Delete</div>
        </section>
    )
}

