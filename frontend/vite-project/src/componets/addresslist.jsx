import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Addresslist = () => {

    const [address, setaddress] = useState([])

      const fetchAddress = async () => {

      try {
        const res = await axios.get(`http://localhost:5001/api/address-list`,
            {withCredentials: true}
        );
          setaddress(res.data.address)
          console.log(res.data.address)

      } catch (err) {
        console.error('Error loading open days', err);
      }
    };

    useEffect(() => {
        fetchAddress()
    },[])

  return (
    <div className='p-5 h-auto'>
      <div className='flex w-full mb-2'>
      <h1 className='font-bold text-2xl w-[80%]'>Address List</h1>
      <Link to={'/address'} className='text-2xl border px-8 rounded-3xl bg-blue-400 text-white'>Add</Link>
      </div>
      <hr className='mb-2' />
      {
        Array.isArray(address) && address.map((item, i) => (
          <div key={i} className='border my-2'>
            <h1 className='font-bold'>{item.Fullname} {item.mobileNo}</h1>
            <h2>{item.state} {item.cityTown} {item.pincode}</h2>
            <h2>{item.ASSV} {item.FHBCA} {item.Landmark}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Addresslist
