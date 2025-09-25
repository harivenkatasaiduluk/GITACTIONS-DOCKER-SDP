 
import { BrowserRouter } from "react-router-dom" 
import MainNavBar from './main/MainNavBar';
import BuyerNavBar from './buyer/BuyerNavBar';
import FarmerNavBar from "./farmer/FarmerNavbar";
import AdminNavBar from './admin/AdminNavBar';
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

function AppContent() 
{
  const { isAdminLoggedIn, isBuyerLoggedIn, isFarmerLoggedIn } = useAuth();

  return (  
    <div>
      <BrowserRouter>         
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isBuyerLoggedIn ? (
          <BuyerNavBar />
        ) : isFarmerLoggedIn ? (
          <FarmerNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  )
}
  function App(){
    return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    );
  }
  
 export default App;
