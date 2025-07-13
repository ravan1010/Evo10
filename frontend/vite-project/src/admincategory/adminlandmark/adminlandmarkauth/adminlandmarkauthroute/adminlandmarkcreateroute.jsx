// ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import Admincategoryadminlandmarkauth from "../adminlandmarkcreateauth";

const ProtectedRouteadminlandmark = ({ children }) => {
    
    const navigate = useNavigate();

  const { user, checking } = Admincategoryadminlandmarkauth();

  if(checking) return <div>Loading...</div>;
  if(!user) return <p>404</p>;

  return children;
};

export default ProtectedRouteadminlandmark

