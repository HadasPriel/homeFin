import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import MonthPicker from '@mui/lab/MonthPicker';
import YearPicker from '@mui/lab/YearPicker';
import Grid from '@mui/material/Grid';



export const  SubComponentsPickers = ({navToMonth}) => {
  const [date, setDate] = React.useState(new Date());
  
  const minDate = new Date('2020-01-01T00:00:00.000');
  const maxDate = new Date('2034-01-01T00:00:00.000');

  const onChooseMonth = (newDate) => {
    setDate(newDate)
    navToMonth(newDate)
}

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
          <YearPicker
            date={date}
            isDateDisabled={() => false}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MonthPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => onChooseMonth(newDate)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}