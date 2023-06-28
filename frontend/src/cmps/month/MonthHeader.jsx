import { utilService } from "../../services/util.service.js"
import { Icon } from "../ui/Icon"


export const MonthHeader = ({ month, addCtegory, onPrevNextMonth }) => {
    const onNext = () => {
        onPrevNextMonth(1)
    }
    const onPrev = () => {
        onPrevNextMonth(-1)
    }

    return (
        <header className='month-header'>
            <header className="header-set">
                <h1 className="month-title">{utilService.getVerbalTime(month.time)}</h1>
                <nav className="flex">
                    <button className="flex center btn solid circel prev" onClick={onPrev} title='previous month' >
                        <Icon name="arrow-icon" />
                    </button>
                    <button className="flex center btn solid circel next" onClick={onNext} title='next month' >
                        <Icon name="arrow-icon" />
                    </button>
                </nav>
            </header>
            <nav>
                <button className="btn suc" onClick={addCtegory} >New Category</button>
                <button className="btn solid">Person</button>
                <button className="btn solid">Filter</button>
                <button className="btn solid">Sort</button>
            </nav>
        </header>
    )
}