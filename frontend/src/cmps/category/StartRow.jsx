

export const StartRow = ({ color }) => {


    return (
        <section className="start-row flex">
            <span className="before-row" style={{ backgroundColor: `var(--${color})` }} ></span>
            <div className="checkbox-wrapper flex center ">
                <label className="checkbox-label">
                    <input type="checkbox" />
                </label>
            </div>
        </section>

    )
}
