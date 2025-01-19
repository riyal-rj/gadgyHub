import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import Navbar from "./components/Navbar.tsx"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore.ts"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner.tsx"
import AdminPage from "./pages/AdminPage.tsx"
import CategoryPage from "./pages/CategoryPage.tsx"
import CartPage from "./pages/CartPage.tsx"

function App() {
  const {user,checkAuth,checkingAuth}=useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if(checkingAuth)
    return <LoadingSpinner/>


  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full
      bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.3)_0%,rgba(72,61,139,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ !user? <LoginPage />: <Navigate to={'/'} />} />
          <Route path="/signup" element={!user?<SignUpPage />: <Navigate to={'/'} />} />
          <Route path="/admin-dashboard" element={user?.role==='admin'? <AdminPage/>: <Navigate to={'/login'}/>}/>
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
