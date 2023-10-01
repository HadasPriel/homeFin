import { useToggle } from "../../hooks/useToggle.js"
import { PricePreview } from "../ui/PricePreview.jsx"
import { EditExpected } from "./EditExpected"


export const CategoryExpected = ({ expected, color, expensesSum, onUpdateCategory, isFooter, currency }) => {
    const [isHover, setIsHover] = useToggle(false)

    const [isEditExpectedShow, setIsEditExpectedShow] = useToggle(false)

    const width = (expensesSum / expected) * 100 || 0
    const bgColor = (expected) ? `linear-gradient(90deg, var(--${color}) ${width}%, rgba(0,0,0,1) ${width}%)` : null

    const updateCategoryExpected = (ev, expectedToSave) => {
        onUpdateCategory(ev, expectedToSave)
        setIsEditExpectedShow(false)
    }


    return (
        <section className={`expected-preview cell flex align-center ${(isFooter && width > 100 && expected) ? 'border-red' : ''}`}  >
            {isEditExpectedShow && isFooter ?
                <EditExpected onUpdateCategory={updateCategoryExpected} setIsEditExpectedShow={setIsEditExpectedShow} /> :
                <section
                    className="bar"
                    onMouseEnter={setIsHover}
                    onMouseLeave={setIsHover}
                    onClick={setIsEditExpectedShow}
                    style={{ background: bgColor }} >
                    <p className="txt flex justify-center align-center">
                        {expected ?
                            (!isHover ? <span className="portion-nums flex">
                                <PricePreview sum={expensesSum} currency={currency} />
                                \
                                <PricePreview sum={expected} currency={currency} />
                            </span> :
                                // (!isHover ? <span>{expensesSum} \ {expected}</span> :
                                <span>{width.toFixed()}%</span>)
                            :
                            (isHover ?
                                <span className="empty-sum">-</span> :
                                ((isFooter) ?
                                    <span className="empty-sum" >Set Sum</span> :
                                    <span className="empty-sum">-</span>))
                        }
                    </p>
                </section>}


        </section>
    )
}
