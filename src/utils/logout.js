import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Optionally, you can clear more stored data if needed:
    // localStorage.clear(); // To clear all stored data

    // Redirect to login page
    navigate('/login');
  };

  return logout;
}

export default useLogout;
