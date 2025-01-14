import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import Navbar from "./components/Navbar.tsx"

function App() {
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
