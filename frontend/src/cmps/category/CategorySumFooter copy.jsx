import { useRef } from "react"

import { useToggle } from "../../hooks/useToggle.js"
import { EditExpected } from "./EditExpected"


export const CategorySumFooter = ({ expected, color, expensesSum, onUpdateCategory }) => {
    const [isHover, setIsHover] = useToggle(false)

    const elExpected = useRef(null)
    const [isEditExpectedShow, setIsEditExpectedShow] = useToggle(false, elExpected)

    const width = (expensesSum / expected) * 100 || 0
    const bgColor = (expected) ? `linear-gradient(90deg, var(--${color}) ${width}%, rgba(0,0,0,1) ${width}%)` : null

    const updateCategoryExpected = (ev, expectedToSave) => {
        onUpdateCategory(ev, expectedToSave)
        setIsEditExpectedShow(false)
    }


    return (
        <section className="category-sum-footer cell flex align-center" ref={elExpected} >
            {isEditExpectedShow ?
                <EditExpected onUpdateCategory={updateCategoryExpected} /> :
                <section
                    className="bar"
                    onMouseEnter={setIsHover}
                    onMouseLeave={setIsHover}
                    onClick={setIsEditExpectedShow}
                    style={{ background: bgColor }} >
                    <p className="txt flex justify-center align-center">
                        {expected ?
                            (!isHover ? <span>${expensesSum} \ ${expected}</span> :
                                <span>{width.toFixed()}%</span>)
                            :
                            (!isHover ? <span className="empty-sum" >Set Sum</span> : <span className="empty-sum">-</span>)
                        }
                    </p>
                </section>}


        </section>
    )
}
