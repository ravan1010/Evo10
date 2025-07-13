import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Success = () => {

const query = useQuery();
const i = query.get("i"); // e.g., "Mobile"

const [image, setimage] = useState();
const [name, setname] = useState();

const fetchSuccess = async() => {
    await axios.get(`http://localhost:5001/api/success?id=${i}`, {withCredentials: true})
    .then((res) => {
        setimage(res.data.image)
        // console.log(res.data.image)
        setname(res.data.name)
        // console.log(res.data.name)
    })
}
useEffect(() => {
    fetchSuccess()
},[])

  return (
    <div>
        <div className="flex items-center justify-center h-screen">
        <div className="w-64 h-auto bg-blue-500 border-2 flex flex-col items-center">
            <h1 className='text-white font-bold text-2xl'>{name}</h1>
            <hr className='border w-[50%]' />
            <h1>booking successful</h1>
            <hr className='w-[100%] border' />
            <img src={image} alt={name} className='h-full w-full' />
            <hr className='w-[100%] border' />
            <Link to='/' className='px-[40%] m-2 border rounded-4xl bg-white'>Ok</Link>
        </div>
        </div>
    </div>
  )
}

export default Success
