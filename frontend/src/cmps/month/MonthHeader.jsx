import { utilService } from "../../services/util.service.js"


export const MonthHeader = ({ month, addCtegory, onPrevNextMonth }) => {

    const onNext = () => {
        onPrevNextMonth(1)
    }

    return (
        <header className='month-header'>
            <button onClick={onNext} >next month</button>
            {month.time && <h1 className="month-title">{utilService.getVerbalTime(month.time)}</h1>}
            <nav>
                <button className="btn suc" onClick={addCtegory} >New Category</button>
                <button className="btn solid">Person</button>
                <button className="btn solid">Filter</button>
                <button className="btn solid">Sort</button>
            </nav>
        </header>
    )
}