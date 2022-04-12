// import { MonthPreview } from "./MonthPreview";
import { SubComponentsPickers } from "../ui/SubComponentsPickers";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { utilService } from '../../services/util.service.js'
import actions from '../../store/actions';



export const MonthList = ({ months }) => {
    let history = useHistory();
    let { accountId } = useParams();
    const dispatch = useDispatch();

    const navToMonth = (newDate) => {
        let date = utilService.getMMYYYY(newDate)
        let month = months.find(month => month.time === date)
        if (month) {
            history.push(`/account/${accountId}/${month._id}`)
        }
        else {
            dispatch(actions.monthActions.loadMonthByTime(date))
            history.push(`/account/${accountId}/${'null'}`)
        }
        //save reqDate on store?
    }

    if (!months) return <div>Loading...</div>
    return (
        <section className="account-details">
            <SubComponentsPickers navToMonth={navToMonth} />
            {/* {months.map(month => <MonthPreview key={month.time} month={month} />)} */}
        </section>
    )
}