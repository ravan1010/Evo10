import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Bothlandmarkdashboard = () => {

    const [post, setpost] = useState('');
    const [productlist, setproductlist] = useState('');
    // const [authorid, setauthorid] = useState('');

    const fetchImages = async () => {
    const res = await axios.get(`http://localhost:5001/api/admin/dashboard`, {withCredentials: true} );
    setpost(res.data.post);
    setproductlist(res.data.productlist)
    // setauthorid(res.data.author)
  
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/${id}`, {withCredentials: true})
      .then((res) => {
        alert(res.data.message)
         window.location.reload();
      })
      .catch(() => alert('delete failed'))
    } catch (error) {
      
    }
  }


  return (
    <div className='w-screen'>
      
      <div className=' flex justify-center'>
          <div className=' m-4 mt-5 flex flex-col '>
            <div className='flex justify-center'>
              <Link className='font-bold' to={'/'}>Evo10</Link>
            </div>
            <div className='flex justify-center'>
            <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
            </div>
            <div className='flex justify-center'>
            <h1 className='text-2xl'>category</h1>
            </div>
            <div className='flex justify-center'>
            <h1 className=''>Bothlandmark</h1>
            </div>
            <hr />
            <div className='flex justify-center mt-4'>
              <Link to='/Bothlandmark/productcreate' className=' border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Create product</Link>
              <Link to='' className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>{productlist} Products</Link>
            </div>
            <div className='flex justify-center mt-4'>
              <Link to={'/admin/setdate'} className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Set date</Link>
              <Link to={'/booked-list'} className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>booked-list</Link>
            </div>
          </div>
        </div>
        <hr />
      <div className='w-full h-fit flex justify-center bg-amber-50 '>
        <div className='flex flex-col'>
      </div>
      </div>
      
         <div className='w-full mt-10 p-5 flex-col hidden lg:block md:block' >
          {
           Array.isArray(post) && post.map((item, ids) => (
            <div key={ids} className='border p-2 m-2 flex w-full h-25'>
              <div className='h-full w-[10%]'>
              <img src={item.image[0]}   className='h-full w-full' />
              </div>
              <div className='flex w-[75%]'>
                <div className='flex w-full'>
                  <div className='w-[80%] my-auto flex'>
                      <p className='font-semibold text-2xl mr-3'>{item.name} </p>
                    <div>
                      <p className='line-through' >{item.compareprice}Rs</p>
                      <p>{item.price}Rs </p>
                    </div>
                  </div>
                    <p className='my-auto font-bold'>{item.Eventcategory} </p>
                </div>
              </div>
              <div className='my-auto'>
            <button onClick={() => deleteProduct(item._id)} className='px-8 h-10 border rounded-3xl'>Delete</button>
              </div>
              </div>
           ))
          }   
        </div>
         <div className='w-full mt-2 flex p-5 flex-col lg:hidden md:hidden ' >
          {
           Array.isArray(post) && post.map((item, ids) => (
            <div key={ids} className='border flex w-full h-25 my-2'>
              <div className='w-[25%] h-full'>
                  <img src={item.image[0]}  alt="" className='h-full w-full' />
              </div>
              <div className='w-[60%] flex my-auto' >
                <div>
                  <p>{item.name} </p>
                  <p>{item.price}Rs </p>
                </div>
                  <p className='ml-2'>{item.Eventcategory} </p>

              </div>
            <button onClick={() => deleteProduct(item._id)} className='py-1 px-5 border-2 rounded-3xl h-10 my-auto'>Delete</button>
              </div>

           ))
          }  
        </div>
               
            
        
      
  </div>
  )
}

export default Bothlandmarkdashboard
