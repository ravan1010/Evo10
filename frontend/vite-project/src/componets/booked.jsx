import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Booked = () => {

    const [booked, setbooked] = useState([])
    const [post, setpost] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const fetchBooked = async () => {
        
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/booked`,
             {withCredentials: true} );
             setbooked(res.data.booked)
             setpost(res.data.post)
        setLoading(false);

    }

    useEffect(() => {
        fetchBooked()
    },[])

    const eventpost = (postId) => {
        const reversed = postId.split("").reverse().join(""); // => "tcaer"
        navigate(`/event?d=${reversed}`)
    }

  return (
    <div>
      <>

      <div className="max-w-xl mx-auto mt-2.5">
      
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <p>No results found.</p>}
      <h1 className='font-bold text-2xl'>Booked</h1>
      {!loading &&
        booked.map((item) => {
          const relatedPost = post.find((p) => p._id === item.event);
          return (
            <div
              key={item._id}
              className="p-4 border rounded shadow flex w-full h-45 bg-white space-y-2"
            >
              <div className='w-[40%] border-r-2'>
                <img
                  src={relatedPost?.image?.[0] }
                  alt={relatedPost?.name}
                  onClick={() => eventpost(relatedPost?._id)}
                  className="w-auto h-full object-cover rounded"
                />
              </div>
              <div className='w-[60%] flex flex-col my-auto m-4'>
                <p className="text-lg font-semibold">{relatedPost?.name || 'No Title'}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Time:</strong> {item.time}</p>
              </div>
            </div>
          );
        })}


    </div>
      </>
    </div>
  )
}

export default Booked
