// useAuthCheck.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const Admincategoryclientslandmark = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/admincategory', { withCredentials: true })
      .then((res) => setUser(res.data.categoryclientslandmark))
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  return { user, checking };
};

export default Admincategoryclientslandmark;
