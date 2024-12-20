import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, LogOut, MessageSquare, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/slices/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const userId =
    (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id) ||
    (sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).id) ||
    null;

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users');
          const user = response.data.find((u) => u.id === userId);
          setUserData(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost avatar">
        <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={userData?.photo || 'path/to/default/avatar'} alt="Profile" />
        </div>
        <span className="hidden lg:inline-block ml-2">{userData?.name || 'Guest'}</span>
        <ChevronDown className="hidden lg:inline-block w-4 h-4 ml-2" />
      </div>

      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm">
        <li>
          <Link to="/messages" className="gap-3">
            <MessageSquare className="w-4 h-4" /> Messages
          </Link>
        </li>
        <li>
          <Link to="/user-profile" className="gap-3">
            <UserCircle2 className="w-4 h-4" /> Profile
          </Link>
        </li>
        <li>
          <button onClick={() => dispatch(logout())} className="gap-3">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
