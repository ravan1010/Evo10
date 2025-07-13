// ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import Admincategoryclientslandmark from "../clientslandmarkcreateauth";

const ProtectedRouteclientslandmark = ({ children }) => {
    
    const navigate = useNavigate();

  const { user, checking } = Admincategoryclientslandmark();

  if(checking) return <div>Loading...</div>;
  if(!user) return <p>404</p>;

  return children;
};

export default ProtectedRouteclientslandmark

