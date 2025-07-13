import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ToAddress = () => {
    
    //inputs
    const [Fullname, setFullname] = useState('');
    const [mobileNo , setmobileNo] = useState('');
    const [FHBCA, setFHBCA] = useState('');
    const [ASSV, setASSV] = useState('');
    const [Landmark, setLandmark] = useState('');
    const [pincode, setpincode] = useState('');
    const [cityTown, setcityTown] = useState('');
    const [state, setstate] = useState('karnataka');

  
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

        await axios.post("http://localhost:5001/api/to/address",{ 
            Fullname : Fullname,
            mobileNo : mobileNo,
            FHBCA: FHBCA,
            ASSV: ASSV,
            Landmark: Landmark,
            pincode: pincode,
            cityTown: cityTown,
            state: state,

        },
         { withCredentials: true })
         .then((res) => {
            setsuccess(res.data.message)
            if(res.data.message === "ok"){
              setFullname('')
              setmobileNo('')
              setFHBCA('')
              setASSV('')
              setLandmark('')
              setcityTown('')
              setpincode('')
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
                <h2 className="font-bold text-3xl mt-10 underline "   >address</h2>
                    <form action="post" className="items-center w-full p-2 pb-0.5" onSubmit={handleSubmit} >

                      <div className='mt-3 p-2.5 border-b-4 border-l-2 border-r-2'>
                        <input 
                        type= "text"
                        name='Fullname'
                        placeholder='Fullname'
                        autoComplete='on'
                        maxLength={15}
                        value={Fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mb-4 h-10"
                        />

                        
                        <input 
                        type= "tel"
                        name='mobileNo'
                        placeholder='mobileNo'
                        autoComplete='on'
                        maxLength={10}
                        minLength={10}
                        value={mobileNo}
                        onChange={handlemobileNoChange}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mb-4 h-10"
                        />
                        </div>

                        <div className='p-5 border-t-4 border-l-2 border-r-2'>
                      
                        <label htmlFor='FHBCA' >Flat, House no, Building, Company, Apartment</label>
                      <input 
                        type= "text"
                        name='FHBCA'
                        id='FHBCA'
                        autoComplete='on'
                        maxLength={25}
                        value={FHBCA}
                        onChange={(e) => setFHBCA(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />

                        
                         <label htmlFor='ASSV' >Area, Street, Sector, Village</label>
                      <input 
                        type= "text"
                        name='ASSV'
                        id='ASSV'
                        autoComplete='on'
                        maxLength={25}
                        value={ASSV}
                        onChange={(e) => setASSV(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />

                         <label htmlFor='Landmark' >Landmark</label>
                      <input 
                        type= "text"
                        name='Landmark'
                        id='Landmark'
                        placeholder='Ex, near hospital, school, collage, medital'
                        autoComplete='on'
                        maxLength={25}
                        value={Landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />

                         <label htmlFor='pincode' >Pincode</label>
                      <input 
                        type= "text"
                        name='pincode'
                        id='pincode'
                        placeholder='6-digit pincode'
                        autoComplete='on'
                        maxLength={25}
                        value={pincode}
                        onChange={(e) => setpincode(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />

                         <label htmlFor='cityTown' >City/Town</label>
                      <input 
                        type= "text"
                        name='cityTown'
                        id='cityTown'
                        autoComplete='on'
                        maxLength={25}
                        value={cityTown}
                        onChange={(e) => setcityTown(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                        />

                         <label htmlFor='state' >state</label>
                      <input 
                        type= "text"
                        name='state'
                        id='state'
                        autoComplete='on'
                        maxLength={25}
                        value={state}
                        onChange={() => setstate(state)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mt-0 h-10"
                      />  
                      </div>
                      
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

export default ToAddress
