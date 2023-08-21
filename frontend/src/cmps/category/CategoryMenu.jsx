import { useToggle } from "../../hooks/useToggle"
import { CategoryColorList } from "./CategoryColorList"
import { Icon } from "../ui/Icon";


export const CategoryMenu = ({ toggleCategoryMenu, onDeleteCategory, updateCategoryColor, toggleEditExpected, color, isMiniPreview, setIsMiniPreview}) => {

    const [isColorShow, setIsColorShow] = useToggle(false)

    // const onToggleEditExpected = () => {
    //     toggleEditExpected()
    //     toggleCategoryMenu()
    // }
    const onSetIsMiniPreview = () => {
        setIsMiniPreview()
        toggleCategoryMenu()
    }


    return (
        <section className="category-menu floating-menu" onMouseLeave={toggleCategoryMenu}>
            <div className="menu-item" onClick={onSetIsMiniPreview}>
                <Icon name={isMiniPreview? 'expand' : 'collapse'} />
                <span>Collapse this category</span>
            </div>
            {/* <div className="menu-item" onClick={onToggleEditExpected}>
                <Icon name="edit" />
                <span>Set expected monthly expense</span>
            </div> */}
            <div className="change-color menu-item" onMouseEnter={setIsColorShow} onMouseLeave={setIsColorShow} >
                {isColorShow && <CategoryColorList updateCategoryColor={updateCategoryColor} />}
                <div className="icon color" style={{ backgroundColor: `var(--${color})` }} ></div>
                <span>Change color</span>
            </div>
            <div className="menu-item">
                <Icon name="duplicate" />
                <span>Duplicate</span>
            </div>
            <div className="delete menu-item" onClick={onDeleteCategory}>
                <Icon name="delete" />
                <span>Delete</span>
            </div>
        </section>
    )
}

