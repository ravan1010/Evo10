// useAuthCheck.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ADMINMainauth = () => {
  const [admin, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/adminmain', { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  return { admin, checking };
};

export default ADMINMainauth
