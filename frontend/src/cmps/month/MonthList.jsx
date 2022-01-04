import { MonthPreview } from "./MonthPreview";


export const MonthList = ({ months }) => {


    if (!months) return <div>Loading...</div>
    return (
        <section className="account-details">
            {months.map(month => <MonthPreview key={month.time} month={month} />)}
        </section>
    )
}