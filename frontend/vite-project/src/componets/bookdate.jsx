import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import Select from "react-select";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BookingDate() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selected, setSelected] = useState('');
  const [time, settime] = useState('');
  const [selectaddress, setSelectaddress] = useState([]);
  const [saveAddress, setsaveAddress] = useState()
  const [category, setcategory] = useState()
  const [discount, setdiscount] = useState()
  const [compare, setcompare] = useState()
  const [price, setprice] = useState()
  const [platfee, setplatfee] = useState()
  const [mobileNo, setmobileNo] = useState('')
  const query = useQuery();
  const i = query.get("i"); // e.g., "Mobile"
  const reversed = i.split("").reverse().join(""); // => "tcaer"
  const navigate = useNavigate()

  const loadOpenDays = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/availabledates-to-book?id=${reversed}`,
            {withCredentials: true}
        );
          setSelectaddress(res.data.address)
          setcategory(res.data.category)
        console.log(res.data.address)
        console.log(res.data.category)

        const dateObjects = res.data.day.map((d) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0); // Normalize
        return date;
      });
      setSelectedDays(dateObjects)
      } catch (err) {
        console.error('Error loading open days', err);
      }
    };

  useEffect(() => {
    loadOpenDays();
  }, []);

  function handlemobileNoChange(e) {
         const value = e.target.value;
  // Allow only numbers
         if (/^\d*$/.test(value)) {
            setmobileNo(value);
        }
    }

    const loadpayment = async () => {

      try {
        const res = await axios.get(`http://localhost:5001/api/get-post-for-event-id-to-book?id=${reversed}`,
            {withCredentials: true}
        );
        setprice(res.data.price)
        setplatfee(res.data.platfee)
        setcompare(res.data.compare)
        setdiscount(res.data.discount)
        

      } catch (err) {
        console.error('Error loading open days', err);
      }
    };

  useEffect(() => {
    loadpayment();
  }, []);

  

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

  const handleDayClick = async (e) => {
      e.preventDefault(); // Prevent form refresh
      if(!selected){
        return alert('select date')
      }
      if(category === 'clientslandmark'){
        if(!saveAddress){
          return alert('select address')
        }
     }

    try {
      await axios.post(`http://localhost:5001/api/booking?id=${reversed}`,
         {date: selected.toLocaleDateString('en-CA'), 
          time: time, 
          saveAddress : saveAddress,
          mobileNo: mobileNo,
        },
         { withCredentials: true })
         .then((res) => {
           navigate(`/success?i=${res.data.id}`)
         })
    } catch (err) {
      console.error(err);
    }
  };

  const options = selectaddress.map(addr => ({
          value: `${addr._id}`,
          label: (
            <div>
              <div><strong>{addr.Fullname}</strong> ({addr.mobileNo})</div>
              <div>{addr.cityTown}, {addr.state} - {addr.pincode}</div>
              <div>{addr.ASSV}, {addr.FHBCA}, {addr.Landmark}</div>
            </div>
          )
  }));

const handleChange = (selectedOption) => {
    const fullAddress = selectedOption.value;
    setsaveAddress(fullAddress);
}

  return (
    <>
      <form method='post' onSubmit={handleDayClick}>
        <h1 className='font-bold text-2xl ml-2.5 mt-7 m-2' >Select Event date </h1>
        <div className='w-screen p-4 flex justify-center mb-2 items-center border'>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={isDateDisabled}
          
        />    
        </div>

    <h1 className='font-bold text-2xl ml-2.5 mt-2 m-2' >Select Time </h1>
    <input type="time" 
           name="time" 
           id="time" 
           value={time} 
           onChange={(e) => settime(e.target.value)} 
           required
           className='font-bold border ml-2.5 p-2 block mb-2 px-9 rounded-2xl' 

           />

            <label htmlFor='mobileNo' className='text-2xl font-bold ml-2'>Contact Number</label>
             <input 
                type= "tel"
                id='mobileNo'
                name='mobileNo'
                placeholder='mobileNo'
                autoComplete='on'
                maxLength={10}
                minLength={10}
                value={mobileNo}
                onChange={handlemobileNoChange}
                required 
                className="w-full px-3 py-3 border-1 block outline-none mb-2 h-10"
              />


          {
            category === "clientslandmark" ? 
            <>
            <button className='border px-5 rounded-3xl mt-5'>
                <Link to={'/address'}> Add address</Link>
            </button>
          <h1 className='font-bold text-2xl ml-2.5 mt-2 m-2' >Select Address </h1>

          <Select options={options} 
                onChange={handleChange}
          />
          </>
          : 
        <></>
          }
         

          <hr className='border mb-2 mt-4' />
          
          <div className='ml-2'>
            <h1 className='text-2xl font-bold mb-2 '>Payment</h1>
            <h1 className='font-bold'>Original Amount: {compare}Rs</h1>
            <h1 className='font-bold'>Discount: {discount}%</h1>
            <h1 className='line-through text-2xl decoration-2.5 font-bold'>{compare}</h1>
            <h1 className='font-bold'>After discount Amount: {price}Rs</h1>
            <p className=''>Platform Fee: {platfee}Rs</p>
            <h1 className='font-bold text-2xl'>Total Amount: {price + platfee}</h1>
          </div>

          <hr className='border-2 m-2' />

          <h1 className='font-bold ml-2'>Payment method</h1>
          <h1 className='font-bold text-2xl ml-2'>ON Hand</h1>

    <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300">Continue</button>
    </form>
 <div>
</div>
</>
  );
}




