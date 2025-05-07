import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/auth_page/SignUp_page';
import SignIn from './pages/auth_page/SignIn_Page';
import Index from './pages/index_page/Index';
import AppProviders from './context/AppContext';
import Cart from './pages/cart_page/Cart';
import Summary from './pages/cart_page/Summary';
import ProductPage from './pages/item_page/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import MemberProfilePage from './pages/profiles/Members/MemberMenuProfile';
import LoginSecurityDetails from './pages/profiles/Members/components/LoginModification/LoginSecurityDetails';
import PaymentMethodsDetailsPage from './pages/profiles/Members/components/PaymentModification/PaymentMethodsDetails';
import WishlistDetailsPage from './pages/profiles/Members/components/WishListModification/WishlistDetails';
import MessagesDetailsPage from './pages/profiles/MessagesModification/MessagesDetails';
import OrdersDetailsPage from './pages/profiles/Members/components/OrdersModification/OrdersDetails';
import ProtectedRoute from './pages/auth_page/components/ProtectedRoute';
import SearchResult from './pages/searchResult_page/SearchResult';
import SupplierSignUp  from './pages/auth_page/SupplierSignUp';
import SupplierProfilePage from './pages/profiles/Suppliers/SupplierProfilePage';
import SupplierLoginSecurityDetails from './pages/profiles/Suppliers/components/LoginAndSecurity/SupplierLoginSecurityDetails';
import ProductsDashboard from './pages/profiles/Suppliers/components/Dashboard/ProductsDashBoard';

const App = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/supplier-signup" element={<SupplierSignUp />} />
          <Route path="/account-supplier" element={<ProtectedRoute><SupplierProfilePage /></ProtectedRoute>} />
          <Route path="/modify-supplier-login-info" element={<ProtectedRoute>< SupplierLoginSecurityDetails/></ProtectedRoute>} />
          <Route path="/manage-products" element={<ProtectedRoute>< ProductsDashboard/></ProtectedRoute>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/productPage/:id" element={<ProductPage />} />
          <Route path="/account" element={<ProtectedRoute><MemberProfilePage /></ProtectedRoute>} />
          <Route path="/modify-login-info" element={<ProtectedRoute><LoginSecurityDetails /></ProtectedRoute>} />
          <Route path="/modify-banking-info" element={<ProtectedRoute><PaymentMethodsDetailsPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistDetailsPage /></ProtectedRoute>} />
          <Route path="/messaging" element={<ProtectedRoute><MessagesDetailsPage /></ProtectedRoute>} />
          <Route path="/supplier-messages" element={<ProtectedRoute><MessagesDetailsPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersDetailsPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/search/:query" element={<SearchResult />} />

        </Routes>
      </Router>
    </AppProviders>
  );
};

export default App;
