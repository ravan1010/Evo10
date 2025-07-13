import  { useState } from 'react';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './navbar';
import ImageSliderforAds from './ads';

const Home = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [image, setimage] = useState([])
  const [link, setlink] = useState([])


 
   
    useEffect(() => {
       const isOnlyPath = !location.search && !location.hash;
       const isNotHome = location.pathname !== "/";
   
       if (isOnlyPath && isNotHome) {
         navigate("/"); // redirect to home
       }
    }, [location, navigate]);
   
    useEffect(() => {
     if (query.trim().length === 0) {
         setResults([]); // Clear results when input is empty
         return;
       }
       const fetchData = async () => {
         const res = await axios.get(`http://localhost:5001/api/search?q=${query}`);
         setResults(res.data);
   
         console.log(results)
       };
   
       fetchData();
    }, [query]);
   
   const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

      if(results) {
        {
          Array.isArray(results) && results.map((item) => {
            navigate(`/search?R=${encodeURIComponent(item.name)}`);
            setResults('');
        })}
      }
      if(results.length === 0){
        navigate(`/search?R=${encodeURIComponent(query)}`);
        setResults('');
      }

    };
   
    const tosearch = (result) => {
           navigate(`/search?R=${encodeURIComponent(result)}`);
           setResults([])
    }

    const getdata = async() => {
    const res = await axios.get('http://localhost:5001/api/owner/getdata',
        {withCredentials: true})
        const images = res.data.map(item => item.image);
        const links = res.data.map(item => item.link);
        setimage(images)
        setlink(links)

  }

  useEffect(() => {
    getdata();
  },[])


  return (
    <>
      <Navbar />
      <div className='lg:hidden w-screen md:h-15 h-auto flex justify-between p-5 '>
        <div >
          <Link to='/' >Evo10</Link>
        </div>
        <div>
          <Link to='/booked' >Booked</Link>
        </div>    
      </div>
       
    <div className='w-full md:justify-items-center  '>
      <form method="get" onSubmit={handleSubmit} >
      <div className="flex w-full md:w-150 ">
        <input
          type="text"
          placeholder="Event, City, Event companies..."
          name='Search'
          maxLength={50}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          
          className="flex-1 px-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 "
        />
        <button
          type="submit"
          onClick={handleSubmit}

          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>
        
        
      </div>
      </form>
      <div className="md:w-200 h-auto w-screen fixed bottom-18 left-1/2 -translate-x-1/2 py-2 px-4 rounded shadow-md lg:hidden">
           <ul className="h-auto w-full border-2 bg-white" > 

            {Array.isArray(results) && results.map((item) => (
        
          <li key={item._id} onClick={() => tosearch(item.name)}
            className="w-full px-8 pb-1.5 border-b-2 border-gray-50 border-x-2">
            {item.name} {item.companyName} {item.cityTown}
          </li>
          
        ))}
        </ul>
        </div>
      
    </div>
  
      <div className='w-screen h-60 mt-2.5 my-auto bg-black border-2 py-auto'>
          <ImageSliderforAds 
          images={image} 
          links={link} 
          autoSlide={true} 
          interval={5000} 
          />;
      </div>          


      <div className='w-screen h-augo flex flex-col  mt-2.5'>
      <div className='w-full border-2'>
        <h1 className='text-3xl ml-2 '>Category</h1>
        <div className='flex items-stretch px-5'>
          <div className='w-1/2 flex justify-center py-5'>
            <Link to='/events?category=wedding'>Wedding</Link>
          </div>
          <div className='w-1/2 flex justify-center py-5'>
            <Link to='/events?category=birthday'>Birthday</Link>
          </div>
        </div>
      </div>
      <div className='border-2'>
        <h1 className='text-3xl ml-4'>Location</h1>
        <div className='flex items-stretch px-5'>
          <div className='w-1/4 flex justify-center py-5'>
            <Link to='/search?R=kollegal'>Kollegal</Link>
          </div>
        </div>
      </div>
      </div>
     
{/* <div className='w-screen h-400 bg-white'>{}</div> */}
      
            

  </>
  )}

export default Home;