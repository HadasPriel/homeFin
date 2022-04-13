import { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';


export const DatePicker = ({ setIsDateShow, editExpenseTime }) => {


    const [date, setDate] = useState(new Date());

    const onChangeDate = (newDate) => {
        setDate(newDate)
        editExpenseTime(newDate)
        setIsDateShow()
    }

    return (
        <section className="date-picker" >

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={onChangeDate} />
            </LocalizationProvider>

        </section>
    )
}

