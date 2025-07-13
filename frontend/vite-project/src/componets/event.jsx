import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageSlider from './eventimageslide';
import Search from './search';
import CalendarWithOpenDates from './availabledates';
// import StarRatingForm from './rating';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EventPage() {

  const navigate = useNavigate()
  const query = useQuery();
  const [post, setpost] = useState('');
  const [price, setprice] = useState();
  const [discount, setdiscount] = useState();
  const d = query.get("d"); // e.g., "Mobile"
  const reversed = d.split("").reverse().join(""); // => "tcaer"

  const fetchImages = async () => {
    const res = await axios.get(`http://localhost:5001/api/get-post-for-event-id?id=${reversed}`, {withCredentials: true} );
    setpost(res.data.post);
    setprice(res.data.price);
    setdiscount(res.data.discount);
  
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const tosearch = (result) => {
    const reversed = result.split("").reverse().join(""); // => "tcaer"
        navigate(`/book/date?i=${encodeURIComponent(reversed)}`);
      }

  return (
    <div>
      <Search />

    {
        <>
        <div key={post._id} className='mt-2 border-2'>
        <div>
          <ImageSlider images={post.image} />;
        </div>
        <div className='mx-2'>
          <h1 className='font-bold text-2xl'>{post.name}</h1>
          <h1 >{post.description}</h1>
        <hr/>
        <div className='flex justify-between mt-2'>
        <div className='p-2'>
          <div className='flex px-2'>
            <h1 className="font-bold text-lg line-through decoration-4">{post.compareprice} </h1>
            <h1 className='font-bold ml-2.5 text-2xl'>{discount}% Off</h1>
          </div>
          <h1 className='font-extrabold text-2xl ml-2' > Rs:{price} </h1>
        </div>
        
        <button 
          className='px-8 py-0 border-x-1 font-bold text-2xl border-y-4 bo mr-5 mb-2.5 rounded-4xl' onClick={() => tosearch(post._id)}>Book
        </button> 

        </div>
        <div className='w-full border-2 px-8.5 mt-1'>
        <h1 className='font-bold text-3xl'>Available dates</h1>
        <CalendarWithOpenDates />
        </div>
        {/* <StarRatingForm productId={post._id} userId={userid}/> */}

        </div>
        </div>
        </>
    }
    </div>
  );
}

export default EventPage