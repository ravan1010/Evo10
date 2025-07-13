import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Bookedlist = () => {

      const [booked, setbooked] = useState([])
      const [post, setpost] = useState([])
      const [loading, setLoading] = useState(false);

    const fetchbookedlist = async() => {
        
        setLoading(true);
        const res = await axios.get('http://localhost:5001/api/bookedlist',
            {withCredentials: true}
        )
          setbooked(res.data.bookedlist)
          setpost(res.data.postlist)
        setLoading(false);

    }

    useEffect(() => {
        fetchbookedlist();
    },[])

  return (
    <div>
       <>

      <div className="max-w-xl mx-auto mt-2.5">
      
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <p>No results found.</p>}
      {!loading &&
        booked.map((item) => {
          const relatedPost = post.find((p) => p._id === item.event);
          return (
            <div
              key={item._id}
              className="p-4 border rounded shadow flex w-full h-55 bg-white space-y-2"
            >
              <div className='w-[40%] border-r-2'>
                <img
                  src={relatedPost?.image?.[0] }
                  alt={relatedPost?.name}
                  className="w-auto h-full object-cover rounded"
                />
              </div>
              <div className='w-[60%] flex flex-col my-auto m-4'>
                <p className='font-bold'><strong>Name:</strong> {item.username}</p>
                <p className='font-bold'><strong>Contact No:</strong> {item.mobileNo}</p>
                 <hr className='border-2 w-[90%]' />
                <p className="text-lg font-semibold">{relatedPost?.name || 'No Title'}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>payment:</strong> {item.paymentMethod}</p>               

              </div>
            </div>
          );
        })}


    </div>
      </>
    </div>
  )
}

export default Bookedlist
