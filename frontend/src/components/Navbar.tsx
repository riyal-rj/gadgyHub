import { ShoppingCart, UserPlus2, LogIn, LogOut, Lock,ComputerIcon} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.ts';
const Navbar = () => {
    const {user,logout} = useAuthStore();
    console.log(user);
    const isAdmin=user?.role==='admin';
    return (
        <header className='fixed top-0 left-0 w-full bg-[rgba(72,61,139,0.9)] bg-opacity-90 
        backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-[rgba(255,215,0,0.7)]'>
            <div className='flex flex-wrap items-center justify-between px-4 py-2'>
            <Link to={'/'} className='text-2xl font-bold text-white items-center space-x-2 flex'>
                <span>byte-Mart</span> 
                <ComputerIcon className='text-[rgba(255,215,0,0.9)]' />
            </Link>

            <nav className='flex flex-wrap items-center gap-4'>
                <Link to={'/'} className='text-[rgba(255,215,0,0.9)] hover:text-[rgba(72,61,139,0.9)]'>Home</Link>
                {
                    user && (
                        <Link to={'/cart'} className='relative group'>
                            <ShoppingCart className='text-[rgba(255,215,0,0.9)] hover:text-[rgba(72,61,139,0.9)]' />
                            <span className='hidden sm:inline text-[rgba(255,215,0,0.9)]'>Cart</span>
                            <span className='absolute top-0 right-0 w-4 h-4 text-xs text-white bg-[rgba(255,69,58,0.9)] rounded-full flex items-center justify-center'>0</span>
                        </Link>
                    )
                }

                {
                    isAdmin && (
                        <Link
                            className='bg-[rgba(72,61,139,0.9)] hover:bg-[rgba(72,61,139,0.7)] text-[rgba(255,215,0,0.9)] px-3 py-1 rounded-md font-medium 
             transition duration-300 ease-in-out flex items-center shadow-md'
                            to={"/admin-dashboard"}
                        >
                            <Lock className='inline-block mr-1' size={18} />
                            <span className='hidden sm:inline'>Dashboard</span>
                        </Link>

                    )
                }
                {
                    user ? (
                        <button
                            className='bg-[rgba(72,61,139,0.9)] hover:bg-[rgba(72,61,139,0.7)] text-[rgba(255,215,0,0.9)] py-2 px-4 rounded- md flex items-center transition duration-300 ease-in-out shadow-md'
                            onClick={logout}
                        >
                            <LogOut size={18} 
                            />
                            <span className='hidden sm:inline ml-2'>Log Out</span>
                        </button>
                    ) : (
                        <>
                            <Link
                                to={"/signup"}
                                className='bg-[rgba(255,215,0,0.9)] hover:bg-[rgba(255,215,0,0.7)] text-[rgba(72,61,139,0.9)] py-2 px-4 
                                rounded-md flex items-center transition duration-300 ease-in-out shadow-md'
                            >
                                <UserPlus2 className='mr-2' size={18} />
                                Sign Up
                            </Link>
                            <Link
                                to={"/login"}
                                className='bg-[rgba(72,61,139,0.9)] hover:bg-[rgba(72,61,139,0.7)] text-[rgba(255,215,0,0.9)] py-2 px-4 
                                rounded-md flex items-center transition duration-300 ease-in-out shadow-md'
                            >
                                <LogIn className='mr-2' size={18} />
                                Login
                            </Link>
                        </>
                    )
                }

            </nav>
            </div>
        </header >
    )
}

export default Navbar