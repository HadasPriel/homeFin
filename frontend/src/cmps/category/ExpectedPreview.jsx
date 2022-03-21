
export const ExpectedPreview = ({ expected, color, expensesSum, toggleEditExpected }) => {

    const width = (expensesSum / expected) * 100 || 0

    return (
        <section className="expected-preview flex align-center">

            <section className="outter"  >
                {!!expensesSum && <section className="inner flex center"
                    style={{ backgroundColor: `var(--${color})`, width: width < 100 ? `${width}%` : '100%' }} >
                    <span > Total {expensesSum}$ <span className="small">({width.toFixed()}%)</span> </span>
                </section>}
            </section>
            <span className="expected-sum" onClick={toggleEditExpected} >Budget: {expected}$</span>
        </section>
    )
}