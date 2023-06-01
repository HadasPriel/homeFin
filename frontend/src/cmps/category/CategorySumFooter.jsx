import { useToggle } from "../../hooks/useToggle"


export const CategorySumFooter = ({ expected, color, expensesSum, toggleEditExpected }) => {
    const [isHover, setIsHover] = useToggle(false)

    const width = (expensesSum / expected) * 100 || 0
    const bgColor = (expected) ? `linear-gradient(90deg, var(--${color}) ${width}%, rgba(0,0,0,1) ${width}%)` : '#c4c4c4'


    return (
        <section className="category-sum-footer cell flex align-center">
            <section
                className="bar"
                onMouseEnter={setIsHover}
                onMouseLeave={setIsHover}
                onClick={toggleEditExpected}
                style={{ background: bgColor }} >
                <p className="txt flex justify-center align-center">
                    {expected ?
                        (!isHover ? <span>${expensesSum} \ ${expected}</span> :
                            <span>{width.toFixed()}%</span>) 
                        :
                        (!isHover ? <span>-</span> : <span>Set Sum</span>) 
                    }
                </p>
            </section>

        </section>
    )
}
