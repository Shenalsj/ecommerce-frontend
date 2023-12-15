//App.tsx
import React, { lazy, Suspense } from "react";
import Home from "./pages/Home";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Cart } from "./components/cart/Cart";
import Footer from "./pages/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Profile = lazy(() => import("./components/profile/Profile"));
const Admin = lazy(() => import("./components/admin/Admin"));
const Register = lazy(() => import("./components/register/Register"));
const ProductDetailPage = lazy(
  () => import("./components/product/ProductDetailPage")
);
const AddProduct = lazy(() => import("./components/admin/AddProduct"));
const Nopage = lazy(() => import("./pages/Nopage"));
const UpdateProduct = lazy(() => import("./components/admin/UpdateProduct"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./components/signIn/SignIn"));
const AddCategory = lazy(() => import("./components/admin/AddCategory"));

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Router>
        <header className="app-header">
          <Navbar toggleTheme={toggleTheme} />
        </header>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/admin" element={<Admin />} />

            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/add-category" element={<AddCategory />} />

            <Route
              path="/admin/update/:productId"
              element={<UpdateProduct />}
            />

            <Route path="/contact" element={<Contact />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<SignIn />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />

            <Route path="*" element={<Nopage />} />
          </Routes>
        </Suspense>

        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
