// ProtectedRoute.js
import ADMINOTPAuth from "../adminotpauth";

const ProtectedRouteADMINOTP = ({ children }) => {
      
  const { user, checking } = ADMINOTPAuth();

  if(checking) return <div>Loading...</div>;
  if(!user) return <h1>404</h1>;

  return children;
};

export default ProtectedRouteADMINOTP

