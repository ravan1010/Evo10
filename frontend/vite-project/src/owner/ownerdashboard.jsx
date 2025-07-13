import { useEffect, useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import OwnerAuth from './authandroute/auth';


const Ownerdashboard = () => {

    const {owner, checking} = OwnerAuth()
    const navigate = useNavigate();
    
    const [link, setlink] = useState('');
    const [image, setimage] = useState('');    

    const [post, setpost] = useState([])

    const [error, setError] = useState('');
    const [success, setsuccess] = useState('');


    const handleFiles = async (e) => {
        const files = Array.from(e.target.files);

      
        if(files.length > 3){
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

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!image){
      return alert('upload image')
    }

    try {

        await axios.post("http://localhost:5001/api/owner/image",{
     
          image: image,
          link: link
        },
         { withCredentials: true })
         .then((res) => {
            setlink('')
            setimage('')
            if(res.data.message === "ok"){
              alert("post created")
                  window.location.reload();
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

  const getdata = async() => {
    const res = await axios.get('http://localhost:5001/api/owner/getdata',
        {withCredentials: true})
        setpost(res.data)
  }

  useEffect(() => {
    getdata();
  },[])

   const deleteimage = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/owner/delete/${id}`, {withCredentials: true})
      .then((res) => {
        alert(res.data.message)
         window.location.reload();
      })
      .catch(() => alert('delete failed'))
    } catch (error) {
      
    }
  }


  return (
    <div>
        {owner ? <>
    <div className="h-auto w-full flex flex-col items-center mt-10">
            <div className="flex flex-col md:w-150 items-center w-full h-auto rounded px-5 p-4 shadow-xl/65 shadow-black inset-shadow-sm inset-shadow-indigo-500 "> 
                <h2 className="font-bold text-3xl mt-10"  >imaga and link for ads</h2>
                    <form action="post" className="items-center w-full p-2 pb-0.5" onSubmit={handleSubmit} >
                      

                    <div className='px-4 border-t-8 border-r-2 border-l-2 mt-2 p-2'>
                      <h1 className='font-bold text-3xl'>Upload image</h1>
                      <div  className="w-fit px-9 rounded-3xl py-1.5 border-1 mt-2 h-10">             
                      <label htmlFor='image' required>Image</label>

                        <input
                          multiple
                          name="image"
                          id="image"
                          type="file"
                          onChange={handleFiles} 
                         className="absolute w-0 h-0 opacity-0"
                        />

                        </div>
                        </div>
                        <label htmlFor='link' className='font-bold ml-2 text-2xl'>link</label>
                        <input 
                        id='link'
                        type='text'
                        name='link'
                        placeholder='link'
                        autoComplete='on'
                        value={link}
                        onChange={(e) => setlink(e.target.value)}  
                        className="w-full px-3 py-3 border-2 mt-0 h-10"

                        />

                        
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: "greenyellow" }}>{ success }</p>}

                        <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"> For ads </button>
                    </form>
                    
            </div> 
    </div>
    
        {Array.isArray(post) && post.map((product) => (
            <div key={product._id}  className="border rounded-2xl shadow hover:shadow-lg transition duration-300 m-1 my-2">
               <img src={product.image[0]} className="w-full h-64" />
               <a href={product.link} className='mb-5 ml-5 text-blue-900'>link </a>
               <div className='my-auto'>
                <button onClick={() => deleteimage(product._id)} className='px-8 h-10 border rounded-3xl'>Delete</button>
              </div>
            </div>
        ))}
    
    </>
    :
     <p>404</p>
        }
    </div>
  )
}

export default Ownerdashboard
