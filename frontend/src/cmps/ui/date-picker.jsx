import { useState } from "react"

import { useClickOutside } from "../../hooks/useClickOutside.js"

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';


export const DatePicker = ({ setIsDateShow, editExpenseTime }) => {

    var elDatePicker = useClickOutside(setIsDateShow)

    console.log(new Date(Date.now()).getMonth());


    const [date, setDate] = useState(new Date());

    const onChangeDate = (newDate) => {
        setDate(newDate)
        editExpenseTime(newDate)
        setIsDateShow()
    }

    return (
        <section className="date-picker" ref={elDatePicker}>

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={onChangeDate} defaultCalendarMonth={new Date(992145202456)} />
            </LocalizationProvider>

        </section>
    )
}
