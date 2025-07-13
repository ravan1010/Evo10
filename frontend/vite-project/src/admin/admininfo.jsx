import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminAddress = () => {
    
    //inputs
    const [companyName, setcompanyName] = useState('');
    const [category , setcategory] = useState('');
    const [image, setimage] = useState('');
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


     const handleFiles = async (e) => {
        const files = Array.from(e.target.files);
      
        if(files.length > 2){
           alert("You can only upload up to 3 files.");
            e.target.value = ''; // Clear the input
            return;
        }
        const base64List = await Promise.all(
          files.map(file => toBase64(file))
        );
        setimage(base64List);

      };

      const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

    //submit handle

   const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!image){
          return setError('select image')
        }
        if(!category){
          return setError('select category')
        }
      
        console.log(category)
    try {
        await axios.post("http://localhost:5001/api/admin/info",{ 
            companyName : companyName,
            category : category,
            image: image,
            FHBCA: FHBCA,
            ASSV: ASSV,
            Landmark: Landmark,
            pincode: pincode,
            cityTown: cityTown,
            state: state

        },
         { withCredentials: true })
         .then((res) => {
            setsuccess(res.data.message)
              navigate(`/admin/setdate`)
            
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
      <h1>Kzone admins</h1>
            <div className="flex flex-col md:w-150 h-auto rounded px-5 p-4 border-1 "> 
                    <form action="post" className="items-center md:w-full p-2 pb-0.5" onSubmit={handleSubmit} >
                          <h2 className="font-bold text-2xl mt-4 mb-3 float-right mr-10"   >Name and Category</h2>

                      <div className='p-5 border-b-10 border-l-2 '>

                        <input 
                        type= "text"
                        name='companyName'
                        placeholder='companyName'
                        autoComplete='on'
                        maxLength={25}
                        value={companyName}
                        onChange={(e) => setcompanyName(e.target.value)}
                        required 
                        className="w-full px-3 py-3 border-1 outline-none mb-4 h-10"
                        />
  
                        <label htmlFor="category" >Choose category </label>
                            <select
                                value={category}
                                id='category'
                                onChange={(e) => setcategory(e.target.value)}
                                 className="w-full px-3 py-0 border-1 outline-none overflow-scroll mb-0 h-10"
                                 >
                                <option value="">select</option>
                                <option value="adminlandmark">events in your landmark</option>
                                <option value="clientslandmark">events in clients landmark</option>
                                <option value="Bothlandmark">Both</option>                                
                            </select>

                             <div  className="w-fit px-9 rounded-3xl py-1.5 border-1 mt-4 h-10">
                      <label htmlFor='image' required>Event office image</label>

                        <input 
                        type="file" 
                        name='image'
                        multiple onChange={handleFiles} 
                        id='image'
                        style={{display:'none'}}
                        
                        />
                        </div>
                            </div>
                            <h2 className="font-bold text-2xl mt-3 mb-3 float-right mr-10"   >Address</h2>
                            <div className='p-5 border-t-10 border-r-2 mb-1.5 '>
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

export default AdminAddress
