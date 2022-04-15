import { useToggle } from "../../hooks/useToggle";


export const ExpectedPreview = ({ expected, color, expensesSum, toggleEditExpected }) => {
    const [isHover, setIsHover] = useToggle(false)

    const width = (expensesSum / expected) * 100 || 0



    return (
        <section className="expected-preview flex align-center">
            <section
                className="outter"
                onMouseEnter={setIsHover}
                onMouseLeave={setIsHover}
                onClick={toggleEditExpected}
                style={{
                    background: `var(--${color})`,
                    background: `linear-gradient(90deg, var(--${color}) ${width}%, rgba(0,0,0,1) ${width}%)`
                }} >
                <p className="txt flex justify-center align-center">
                    {!isHover ? <span>${expensesSum} \ ${expected}</span> :
                        <span >{width.toFixed()}%</span>}
                </p>
            </section>
        </section>
    )
}
