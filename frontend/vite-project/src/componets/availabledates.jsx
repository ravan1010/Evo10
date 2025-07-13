import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CalendarWithOpenDates() {
  const [selectedDays, setSelectedDays] = useState([]);
  const query = useQuery();
  const d = query.get("d"); // e.g., "Mobile"
  const reversed = d.split("").reverse().join(""); // => "tcaer"

  console.log(reversed)

useEffect(() => {
    const loadOpenDays = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/availabledates?id=${reversed}`,
            {withCredentials: true}
        );
         const dateObjects = res.data.day.map((d) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0); // Normalize
        return date;
      });
      setSelectedDays(dateObjects)
      localStorage.setItem('date', dateObjects)
        // const openDate = res.data.map(dateStr => new Date(dateStr));
        // setSelectedDays(openDate);
      } catch (err) {
        console.error('Error loading open days', err);
      }
    };

    loadOpenDays();
  },[] );


  // console.log("suhas",selectedDays)
// const openDateStrings = selectedDays.map(d => d.toDateString());

 const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize
    date.setHours(0, 0, 0, 0); // Normalize

    const isBeforeToday = date < today;
    const isNotOpen = !selectedDays.some(
      (d) => d.getTime() === date.getTime()
    );

    return isBeforeToday || isNotOpen; // Disable if either is true
  };

  return (
    <>
    <DayPicker
      mode="single"
      onSelect={() => {}} // override selection handler
      disabled={isDateDisabled}
    />    

</>
  );
}
