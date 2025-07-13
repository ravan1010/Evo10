// import MultiImageUploader from "./image"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserPage from './image';
// import MultiImageUploader from './image';
import Home from './componets/home';

//og
import SignupOne from './signup/signup';
import UserAddress from './signup/UserAddress';
//main token for user
import ProtectedRoute from './signup/auth/authroute/atokenroute';

//login
import Login from './login/login';
import { AuthProvider, useAuth } from './login/logout';

//admin
import ADMINsignup from './admin/adminsignup';
//admin otp to verify
import ProtectedRouteADMINOTP from './admin/auth/adminauthroute/adminotproute';
import AdminOTPverify from './admin/adminotp';
//admin info
import AdminAddress from './admin/admininfo';
import ProtectedRouteADMININFO from './admin/auth/adminauthroute/admininforoute'
import ProtectedRouteADMINMain from './admin/auth/adminauthroute/adminMainroute';
import OpenDayCalendar from './admin/days';

import ProtectedRouteAuthlocation from './signup/auth/authroute/lnauthroute';
//adminlandmark dashboard and product create route
import ProtectedRouteadminlandmark from './admincategory/adminlandmark/adminlandmarkauth/adminlandmarkauthroute/adminlandmarkcreateroute';
import Adminlandmark from './admincategory/adminlandmark/adminlandmarkcreate';
import Adminlandmarkdashboard from './admincategory/adminlandmark/adminlandmarkdashboard';

//clientslandmark 
import ProtectedRouteclientslandmark from './admincategory/clientslandmark/clientslandmarkauth/clientslandmarkroute/clientslandmarkcreateroute'
import Clientslandmark from './admincategory/clientslandmark/clientslandmarkcreate';
import Clientslandmarkdashboard from './admincategory/clientslandmark/clientslandmarkdashboard';

//bothlandmark
import Bothlandmark from './admincategory/Bothlandmark/Bothlandmarkcreate';
import Bothlandmarkdashboard from './admincategory/Bothlandmark/Bothlandmarkdashboard';
import ProtectedRouteBothlandmark from './admincategory/Bothlandmark/Bothlandmarkauth/Bothlandmarkroute/Bothlandmarkcreateroute';

import CategoryPage from './componets/category';
import SearchResultPage from './componets/searchresults';
import EventPage from './componets/event';
import BookingDate from './componets/bookdate';
import ToAddress from './componets/address';
import Profile from './componets/profile';
import Addresslist from './componets/addresslist';
import Success from './componets/success';
import Booked from './componets/booked';
import Bookedlist from './componets/bookedlist';
import Ownerlog from './owner/ownerlog';
import Ownerverify from './owner/ownerverify';
import Ownerdashboard from './owner/ownerdashboard';


function App() {

  return (
    <>
    <Router>
      <Routes>
        //user email or number for signup
        <Route path='/signup' element={<SignupOne />} />
        //address
        <Route path='/citytown' element={
          <ProtectedRoute >
            <UserAddress />
          </ProtectedRoute> 
        }/>

         <Route path='/address' element={
          <ProtectedRoute >
            <ToAddress />
          </ProtectedRoute> 
        }/>

        //login
        <Route path='/login' element={<Login />} />
        //logout
        
        //admin signup
        <Route path='/admin' element={
          <ProtectedRoute >
              <ADMINsignup />
          </ProtectedRoute>
        }/>

        //admin otp
        <Route path='/admin/verify' element={
          <ProtectedRoute >
              <ProtectedRouteADMINOTP >
                <AdminOTPverify />
              </ProtectedRouteADMINOTP>
          </ProtectedRoute>
        }/>
        <Route path='/admin/info' element={
          <ProtectedRoute>
              <ProtectedRouteADMININFO>
                <AdminAddress />
              </ProtectedRouteADMININFO> 
          </ProtectedRoute>
         } />
          <Route path='/admin/setdate' element={
            <ProtectedRoute>
              <ProtectedRouteADMINMain>
                  <OpenDayCalendar />
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
          } />


//admin dashboard and create, delete based on category
//admin create adminlandmark product
          <Route path='/adminlandmark/productcreate' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteadminlandmark>
                  <Adminlandmark />
                </ProtectedRouteadminlandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

         //admin food dashboard
          <Route path='/adminlandmark/dashboard' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteadminlandmark>
                  <Adminlandmarkdashboard />
                </ProtectedRouteadminlandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

  //admin create clientslandmark product

          <Route path='/clientslandmark/productcreate' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteclientslandmark>
                  <Clientslandmark />
                </ProtectedRouteclientslandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

          <Route path='/clientslandmark/dashboard' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteclientslandmark>
                  <Clientslandmarkdashboard />
                </ProtectedRouteclientslandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

  //admin create Bothlandmark product

         <Route path='/Bothlandmark/productcreate' element={
           <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteBothlandmark>
                  <Bothlandmark />
                </ProtectedRouteBothlandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
          
         }/>

         <Route path='/Bothlandmark/dashboard' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                <ProtectedRouteBothlandmark>
                  <Bothlandmarkdashboard /> 
                </ProtectedRouteBothlandmark>
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
          
         }/>

         <Route path='/' element={
                  <Home /> 
          } />
         <Route path='/events' element={
                <CategoryPage />
         } />
         <Route path='/event' element={
                <EventPage />
         } />
         <Route path='/search' element={
              <SearchResultPage />            
         }/>

         <Route path='/book/date' element={
          <ProtectedRoute>
            <BookingDate />
          </ProtectedRoute>
          }/>

         <Route path='/profile' element={
              <AuthProvider>
                <Profile />
              </AuthProvider>
          } />

          <Route path='/address-list' element={
            <ProtectedRoute>
              <Addresslist />
            </ProtectedRoute>
            } />

          <Route path='/success' element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
            } />

          <Route path='/booked' element={
            <ProtectedRoute>
              <Booked />
            </ProtectedRoute>
            } />

          <Route path='/booked-list' element={
            <ProtectedRouteADMINMain>
              <Bookedlist />
            </ProtectedRouteADMINMain>
            } />

          <Route path='/owner/log' element={
            <Ownerlog />
          } />
           <Route path='/owner/verify' element={
            <Ownerverify />
          } />
          <Route path='/owner/log' element={
            <Ownerlog />
          } />
           <Route path='/owner' element={
            <Ownerdashboard />
          } />


      </Routes>
     
    </Router>
    




        
    
    </>
  )
}

export default App
