import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OpenDayCalendar = () => {

  const [selectedDays, setSelectedDays] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const loadOpenDays = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/openday`,
            {withCredentials: true}
        );
        const openDates = res.data.map(dateStr => new Date(dateStr));
        setSelectedDays(openDates);
      } catch (err) {
        console.error('Error loading open days', err);
      }
    };

    loadOpenDays();
  },[] );

  const today = new Date();

  // Disable all dates before today (including yesterday)
  const disableBefore = new Date(today);
  disableBefore.setHours(0, 0, 0, 0); // Normalize to midnight

  // Disable all dates after 5 months from today
  const disableAfter = new Date(today);
  disableAfter.setMonth(today.getMonth() + 5);

  const handleDayClick = async (e) => {
      e.preventDefault(); // Prevent form refresh

    try {
      await axios.post(`http://localhost:5001/api/opendayupdate`,
         {date: selectedDays.map(d => d.toLocaleDateString('en-CA')),
          
          },
         { withCredentials: true })
         .then((res) => {
          navigate(`/${res.data.category}/dashboard`)
         })
    } catch (err) {
      console.error('Toggle failed', "heloo");
    }
  };

  return (
    <>
      <div className='md:w-screen md:h-screen'>
        <div className='flex justify-center h-auto w-full' >
          <div className='h-auto md:w-100 w-full md:mt-20 border-2 mt-5 pt-1.5 p-5 '>
            <h1 className='font-bold text-2xl'>mark open days</h1>
            <p>uncheck your off days</p>
    <form method='post' onSubmit={handleDayClick}>
          <div className='h-auto md:w-auto w-auto mt-1.5 pt-1.5 md:p-5 border-t-2 border-b-2'>
      {selectedDays.length > 0 && (
       <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={setSelectedDays}
        disabled={{ before: disableBefore, after: disableAfter }}
        className='w-full h-auto'
      />
        )
      }
      {
        selectedDays.length === 0 && (
       <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={setSelectedDays}
        disabled={{ before: disableBefore, after: disableAfter }}
         className='w-full h-auto'

      />
    )
      }
   </div>
    <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300">submit</button>
    </form>
     </div>
     </div>
    </div>

   
</>
  );
};

export default OpenDayCalendar;
