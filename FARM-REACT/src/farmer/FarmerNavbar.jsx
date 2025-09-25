import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaTachometerAlt, 
  FaShoppingCart, 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaInfoCircle, 
  FaBoxOpen, 
  FaUser,
  FaSignOutAlt 
} from 'react-icons/fa';
import Contact from './../main/Contact';
import NotFound from './../main/NotFound';
import Dashboard from './Dashboard';
import Orders from './Orders';
import FarmerHome from './FarmerHome';
import AddProducts from './AddProducts';
import MyListings from './MyListings';
import Transactions from './../buyer/Transactions';
import './Farmer.css'; 
import { useAuth } from '../contextapi/AuthContext';
import FarmerProfile from './FarmerProfile';
import logo from '../assets/logo.png';

export default function FarmerNavBar() {
  const { setIsFarmerLoggedIn } = useAuth(); 

  const handleLogout = () => {
    setIsFarmerLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '40px', width: '40px', marginRight: '8px', borderRadius: '50%' }} />
          <h1 style={{ fontSize: '24px', color: 'white' }}><strong>AgroDirect</strong></h1>
        </div>

        <div className="profile-link">
          <ul>
            <li>
              <Link to="/farmerprofile" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                  width: '30px',
                  height: '30px'
                }}>
                  <FaUser color="black" />
                </div>
                MyProfile
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-heading">Farmer Dashboard</div>
          <ul>
            <li>
              <NavLink to="/farmerhome" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaHome className="nav-icon" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/farmerdashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaTachometerAlt className="nav-icon" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/addproducts" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaBoxOpen className="nav-icon" /> Add Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/mylistings" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaClipboardList className="nav-icon" /> My Listings
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaShoppingCart className="nav-icon" /> Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaMoneyBillWave className="nav-icon" /> Transactions
              </NavLink>
            </li>
            <li>
              <Link to="/farmerlogin" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" /> Logout
              </Link>
            </li>
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/farmerhome" element={<FarmerHome />} />
            <Route path="/farmerdashboard" element={<Dashboard />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/mylistings" element={<MyListings />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/farmerprofile" element={<FarmerProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
