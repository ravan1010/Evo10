import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  console.log(query)

  const name = new URLSearchParams(search).get("name");

    const location = useLocation();

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

  return(
      <>
  
    <div className='w-full md:justify-items-center mt-5'>
      <form method="get" onSubmit={handleSubmit} >
      <div className="flex w-full md:w-150 ">
        <input
          type="text"
          placeholder="Event, City, Event companies..."
          name="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      
{name ? 
<p></p>
:
<>

      <ul className="mt-2 fixed h-auto lg:w- w-screen bg-white" > 
        {Array.isArray(results) && results.map((item) => (
          <>
          <li key={item._id} onClick={() => tosearch(item.name)}
            className="w-full px-8 pb-1.5 border-b-2 border-gray-50 border-x-2">
            {item.name} {item.companyName} {item.cityTown}
          </li>
          </>
        ))}
      </ul>
      {results.length > 0  ?
            <ul className="w-full h-screen bg-white" /> :
            <ul className="w-full h-auto bg-white" />
      }
      </>
    }
    </div>
    </>
  );
};

export default Search;
