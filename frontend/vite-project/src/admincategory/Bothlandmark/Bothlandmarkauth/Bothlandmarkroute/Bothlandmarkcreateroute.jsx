// ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import AdmincategoryBothlandmark from "../Bothlandmarkcreateauth";

const ProtectedRouteBothlandmark = ({ children }) => {
    
    const navigate = useNavigate();

  const { user, checking } = AdmincategoryBothlandmark();

  if(checking) return <div>Loading...</div>;
  if(!user) return <p>404</p>;

  return children;
};

export default ProtectedRouteBothlandmark

