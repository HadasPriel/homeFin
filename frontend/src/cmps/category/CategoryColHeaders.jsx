import { StartRow } from "./StartRow"


export const CategoryColHeaders = ({ color, cols }) => {

    return (
        <section className="headers row-container">
            <div className="flex expense-description">
                <StartRow color={color} />
                <div className="flex center budget cell">Budget</div>
            </div>
            <div className="col-list">
                {cols.map(col => <div className="cell flex center" key={col} >{col}</div>)}
            </div>
            <div className="last-cell cell flex center"></div>
        </section>
    )
}
