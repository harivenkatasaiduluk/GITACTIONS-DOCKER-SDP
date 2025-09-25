import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaTachometerAlt, 
  FaShoppingCart, 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaInfoCircle, 
  FaUser,
  FaSignOutAlt 
} from 'react-icons/fa';
import Contact from './../main/Contact';
import Menu from './../main/menu';
import NotFound from './../main/NotFound';
import BuyerRegistration from './BuyerRegistration';
import BuyerLogin from './BuyerLogin';
import './buyer.css';
import About from './../main/About';
import BuyerHome from './BuyerHome';
import Cart from './Cart';
import BuyProducts from './BuyProducts';
import Transactions from './Transactions';
import MyOrders from './MyOrders';
import Dashboard from './Dashboard';
import { useAuth } from '../contextapi/AuthContext';
import BuyerProfile from './BuyerProfile';
import UpdateProfile from './UpdateProfile';
import logo from '../assets/logo.png';
import ProductDetails from './ProductDetails';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';

export default function BuyerNavBar() {
  const { setIsBuyerLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsBuyerLoggedIn(false);
    sessionStorage.clear();
    navigate('/buyerlogin');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              height: '40px', 
              width: '40px', 
              marginRight: '8px', 
              borderRadius: '50%' 
            }} 
          />
          <h1 style={{ fontSize: '24px', color: 'white' }}>
            <strong>AgroDirect</strong>
          </h1>
        </div>

        <div className="profile-link">
          <ul>
            <li>
              <Link 
                to="/buyerprofile" 
                style={{ display: 'flex', alignItems: 'center' }}
              >
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
        <aside className="sidebar">
          <h2 className="sidebar-heading">Menu</h2>
          <ul>
            <li><Link to="/buyerhome"><FaHome /> Home</Link></li>
            <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
            <li><Link to="/buyproducts"><FaShoppingCart /> Buy Products</Link></li>
            <li><Link to="/myorders"><FaClipboardList /> My Orders</Link></li>
            <li><Link to="/cart"><FaShoppingCart /> Cart</Link></li>
            <li><Link to="/transactions"><FaMoneyBillWave /> Transactions</Link></li>
            <li><Link to="/about"><FaInfoCircle /> About Us</Link></li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '8px 16px'
                }}
              >
                <FaSignOutAlt style={{ marginRight: '8px' }} /> 
                Logout
              </button>
            </li>
          </ul>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<BuyerHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/buyerregistration" element={<BuyerRegistration />} />
            <Route path="/buyerlogin" element={<BuyerLogin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/buyproducts" element={<BuyProducts />} />
            <Route path="/buyerhome" element={<BuyerHome />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buyerprofile" element={<BuyerProfile />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}