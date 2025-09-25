import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import NotFound from './NotFound';
import BuyerLogin from './../buyer/BuyerLogin';
import BuyerRegistration from './../buyer/BuyerRegistration';
import FarmerLogin from './../farmer/FarmerLogin';
// import logo from '../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './style.css';
import Menu from './Menu';
   
export default function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">AgroDirect</div>
        <div className="logo">
        
        </div>
        
     
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
 
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/buyerregistration" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
          <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              Login <KeyboardArrowDownIcon className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/buyerlogin" onClick={() => setIsMenuOpen(false)}>Buyer</Link></li>
              <li><Link to="/farmerlogin" onClick={() => setIsMenuOpen(false)}>Farmer</Link></li>
              <li><Link to="/adminlogin" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
            </ul>
          </li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/buyerregistration" element={<BuyerRegistration />} exact />
        <Route path="/buyerlogin" element={<BuyerLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/farmerlogin" element={<FarmerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/menu" element={<Menu/>} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}
