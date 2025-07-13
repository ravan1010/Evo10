import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAddress = () => {
    
    //inputs
    const [cityTown, setcityTown] = useState('');
  
    // const [suggestionsCity, setSuggestionsCity] = useState([]);
    const [success, setsuccess] = useState('');
    const [error, setError] = useState('');
    // const [check, setcheck] = useState('')
    const navigate = useNavigate();

    //handle mobile no

    function handlemobileNoChange(e) {
         const value = e.target.value;
  // Allow only numbers
         if (/^\d*$/.test(value)) {
            setmobileNo(value);
        }
    }
   
    //submit handle

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {

        await axios.put("http://localhost:5001/api/address",{ 
            cityTown: cityTown,

        },
         { withCredentials: true })
         .then((res) => {
            setsuccess(res.data.message)
            if(res.data.message === "ok"){
              navigate('/')
            }
            
         })
        
    } catch (err) {
       if (err.response) {
          setError(err.response.data.message); // Server error
        } else {
          setError("Network error"); // Network error
        }
    }
   
  };

  return (
    <div>
    <div className="h-screen flex flex-col items-center ">
      <h1>Kzone</h1>
            <div className="flex flex-col md:w-150 h-auto rounded px-5 p-4 border-1 "> 
                <h2 className="font-bold text-3xl mt-10 ">Enter City or Town</h2>
                    <form action="post" className="items-center w-full p-2 pb-0.5" onSubmit={handleSubmit} >

                      <input 
                        type= "text"
                        name='cityTown'
                        id='cityTown'
                        autoComplete='on'
                        placeholder='Enter city or town'
                        maxLength={25}
                        value={cityTown}
                        onChange={(e) => setcityTown(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />
               
                        {
                          success ? <p style={{ color: 'greenyellow'  }} >{success}</p>
                        :
                          <p style={{ color: 'red' }}>{error}</p>
                        }

                        <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"> Next </button>
                    </form>

                    
            </div> 
    </div>
    </div>
  )
}

export default UserAddress
