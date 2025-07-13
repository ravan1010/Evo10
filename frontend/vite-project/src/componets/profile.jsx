import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../login/logout';
import ADMINMainauth from '../admin/auth/adminMainauth';
import Navbar from './navbar';
import useAuthCheck from '../signup/auth/atokenauth';


const Profile = () => {

    const [number, setnumber] = useState()
    const {logout} = useAuth();
    const { admin } = ADMINMainauth();
    const { user } = useAuthCheck()
    const [toadmin, settoadmin] = useState('')
    const [showConfirm, setShowConfirm] = useState(false);

    
     const fetchtoadmin = async () => {
      const res = await axios.get(`http://localhost:5001/api/toadmin`, {withCredentials: true} );
      settoadmin(res.data)
    };
  
    useEffect(() => {
      fetchtoadmin();
    }, []);


     const fetchnumber = async () => {
        const res = await axios.get(`http://localhost:5001/api/setting`, {withCredentials: true} );
        setnumber(res.data.number);      
      };
    
      useEffect(() => {
        fetchnumber();
      }, []);

      const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if(confirmLogout){
          return
        }
      };

  return (
    <>
    <Navbar />
    <div className='mt-5 lg:mt-20 lg:hidden'>
      <h1 className='font-bold text-2xl border-b-2 mb-5'>No : {number}</h1>
      <div className='px-5 flex flex-col'>
      <Link to={'/address-list'}>Address list</Link>

      {
        user ? 
        <>
        <Link onClick={() => setShowConfirm(true)}>Logout</Link>
        </>
        :
        <>
        <Link to={'/signup'}>Login</Link>
        </>
      }
        {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
        {
        admin ? 
        <>
          <Link to={`/${toadmin}/dashboard`} className='block'>admin</Link>
        </>
        :
        <>
          <Link to={'/admin'}>admin</Link>
        </>
      }

      </div>
    </div>
    </>
  )
}

export default Profile
