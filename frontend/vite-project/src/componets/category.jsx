import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CategoryPage() {
  const navigate = useNavigate()
  const query = useQuery();
  const [post, setpost] = useState('');
  const category = query.get("category"); // e.g., "Mobile"
  const [loading, setLoading] = useState(false);


  
    const fetchImages = async () => {
    setLoading(true)
    const res = await axios.get(`http://localhost:5001/api/getpost-by-category?category=${category}`, {withCredentials: true} );
    setpost(res.data.post);
    setLoading(false)

    // setauthorid(res.data.author)
  
  };

  useEffect(() => {
    fetchImages();
  }, []);

    const tosearch = (result) => {
    const reversed = result.split("").reverse().join(""); // => "tcaer"
        navigate(`/event?d=${encodeURIComponent(reversed)}`);
      }
  
    const onlandmark = (category) => {
      if(category === "adminlandmark"){
        return "onOwner" 
      }else if(category === "clientslandmark"){
        return "onYour"
      }
    }

  return (
    <div>
      {/* <h2>Search: {search}</h2> */}
      {loading && <p className='text-3xl fixed font-bold '>Loading...</p>}
      {!loading && post.length === 0 && category && <p>No results found.</p>}
      {
        // post.length > 0 ? 
          Array.isArray(post) && post.map((item, ids) => (
          <div key={ids} onClick={() => tosearch(item._id)}  className="border rounded-2xl shadow hover:shadow-lg transition duration-300 m-1 my-2">
            <img src={item.image[0]} alt={item.name} className="w-full h-64" />
            <div className="px-4 p-2 flex w-full">
              <div className='w-[70%]'>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <div className='flex mb-2'>
              <p className="text-gray-700 mr-3 line-through">{item.compareprice}</p>
              <p className='text-black'>Rs{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                </svg>
                <span className="text-sm text-gray-700">{item.cityTown}</span>
              </div>
              </div>
              <div className='w-[30%]'>
                <h1 className='font-extrabold'>{item.Eventcategory}</h1>
                {onlandmark(item.category)}
              </div>
            </div>
          </div>
           ))
          }  
    </div>
  );
}

export default CategoryPage