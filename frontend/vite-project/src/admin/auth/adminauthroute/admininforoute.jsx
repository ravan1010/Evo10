// ProtectedRoute.js
import ADMININFOAuth from "../admininfoauth";

const ProtectedRouteADMININFO = ({ children }) => {
      
  const { user, checking } = ADMININFOAuth();

  if(checking) return <div>Loading...</div>;
  if(!user) return <h1>404</h1>;

  return children;
};

export default ProtectedRouteADMININFO

