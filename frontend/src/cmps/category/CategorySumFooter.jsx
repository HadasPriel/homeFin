import { useRef } from "react"

import { useToggle } from "../../hooks/useToggle"
import { CategorySumMenu } from "./CategorySumMenu";


export const CategorySumFooter = ({ expected, color, expensesSum, onUpdateCategory }) => {

    const elExpected = useRef(null)
    const [isMenuShow, setIsMenuShow] = useToggle(false, elExpected)


    const updateCategoryExpected = (ev, expectedToSave) => {
        onUpdateCategory(ev, expectedToSave)
        setIsMenuShow(false)
    }


    return (
        <section className="category-sum-footer cell flex center" ref={elExpected} >
            {isMenuShow &&
                <CategorySumMenu
                    updateCategoryExpected={updateCategoryExpected}
                    expensesSum={expensesSum}
                />}
            <section className="flex col center" onClick={setIsMenuShow}>
                ${expensesSum} <span className="measure-unit" >sum</span>
            </section>



        </section>
    )
}
