  // Navbar.js
  import React, { useEffect, useState } from 'react';
  import { Link, NavLink, useNavigate } from 'react-router-dom';
  import Search from './search';
import useAuthCheck from '../signup/auth/atokenauth';

  const Navbar = () => {

    const {user} = useAuthCheck()
   
    return (
      <>
      <nav className='lg:hidden' >
        <div className="md:w-200 w-screen fixed bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-md">
          <div className='w-full flex justify-between p-5 border-t-2 bg-blue-50'>
            <NavLink to="/"  className={({ isActive }) => (isActive ? "text-blue-500 " : "text-gray-500 ")}>Home</NavLink>
            <NavLink to="/events?category=adminlandmark"  className={"text-gray-500 "}>onOwner</NavLink>
            <NavLink to="/events?category=clientslandmark"   className={"text-gray-500"} >onYour</NavLink>
            <NavLink to="/profile"  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}>Profile</NavLink>
          </div>
        </div>
      </nav>
       <nav className='hidden lg:block' >
        <div className="w-screen">
          <div className='w-full flex justify-between p-5 px-10 border-t-2'>
            <div className='flex'>
              <NavLink to="/"  className={'font-bold text-2xl mr-5'}>Home</NavLink>
              <NavLink to='/booked' className={'font-bold text-2xl '}>Booked</NavLink>
            </div>
            <NavLink to="/profile"  className={'font-bold text-2xl'}>{user ? 'profile' : 'sign/login'}</NavLink>
          </div>
        </div>
      </nav>

      </>
    );
  };

  export default Navbar;