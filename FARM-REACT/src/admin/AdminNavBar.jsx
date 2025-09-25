import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { 
    FaHome, 
    FaUsers, 
    FaBox, 
    FaChartBar,
    FaSignOutAlt
} from 'react-icons/fa';
import { MdHome, MdDashboard, MdShoppingCart, MdAttachMoney, MdInfo } from 'react-icons/md';
import NotFound from './../main/NotFound';
import './admin.css';
import Dashboard from './Dashboard';
import OrderManagement from './OrderManagement';
// import ProductsListings from './ProductsListings';
import AdminHome from './AdminHome';
// import ReportsAndAnalytics from './ReportsAndAnalytics';
import ViewBuyers from './ViewBuyers';
import ViewFarmers from './ViewFarmers';
 
import AddFarmer from './AddFarmer';
import { useAuth } from '../contextapi/AuthContext';
import About from './../main/About';
import ManageProducts from './ManageProducts';
// import Reports from './Reports';
import logo from '../assets/logo.png';

export default function AdminNavBar() {
 
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
    sessionStorage.clear();
  };

  return (
    
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '40px', width: '40px', marginRight: '8px', borderRadius: '50%' }} />
          <h1 style={{ fontSize: '24px', color: 'white' }}><strong>AgroDirect</strong></h1>
        </div>
      </nav>

      <div className="main-content">
    
        <aside className="sidebar">
          <h2 className="sidebar-heading">Menu</h2>
          <ul>
            <li><Link to="/adminhome"><MdHome /> Home</Link></li>
            <li><Link to="/dashboard"><MdDashboard /> Dashboard</Link></li>
            <li><Link to="/addfarmer"> Add Farmers</Link></li>
            <li><Link to="/viewfarmers"> View Farmers</Link></li>
            <li><Link to="/viewbuyers"> View Buyers</Link></li>
            <li><Link to="/manageproducts"><MdShoppingCart /> Manage Products</Link></li>
            {/* <li><Link to="/reportsandanalytics"><MdInfo /> Reports and Analytics</Link></li> */}
            <li><Link to="/about"><MdInfo /> About Us</Link></li>
            <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>    
          </ul>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/addfarmer" element={<AddFarmer/>} exact />
            <Route path="/viewfarmers" element={<ViewFarmers/>} exact />
            <Route path="/viewbuyers" element={<ViewBuyers/>} exact />
            {/* <Route path="/reportsandanalytics" element={<Reports />} exact /> */}
            <Route path="/adminhome" element={<AdminHome />} exact />
            {/* <Route path="/productlistings" element={<ProductsListings />} exact /> */}
            <Route path="/ordermanagement" element={<OrderManagement/>} exact />
            <Route path="/manageproducts" element={<ManageProducts/>} exact />
            <Route path="/about" element={<About/>} exact />
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="*" element={<NotFound />} exact /> 
          </Routes>
        </main>
      </div>
    </div>
  );
}
