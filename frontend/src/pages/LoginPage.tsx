import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, LockKeyholeIcon, ArrowRight, Loader2, User2Icon } from "lucide-react";
const LoginPage = () => {
    const loading:boolean=false;

    const [emailOrUsername, setEmailOrUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(emailOrUsername, password);
    };
  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-[rgba(255,215,0,0.9)]'>
            Login to your Account
        </h2>
    </motion.div>

    <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
    >
        <div className='bg-[rgba(44,44,84,0.9)] py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label htmlFor='identifier' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
                         Email ID or Username
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <User2Icon className='h-5 w-5 text-[rgba(255,215,0,0.7)]' aria-hidden='true' />
                        </div>
                        <input
                            id='emailOrusername'
                            type='text'
                            required
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            className='block w-full px-3 py-2 pl-10 bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm
                            placeholder-[rgba(255,215,0,0.6)] focus:outline-none focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)] sm:text-sm'
                            placeholder='you@example.com or username'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
                        Password
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <LockKeyholeIcon className='h-5 w-5 text-[rgba(255,215,0,0.7)]' aria-hidden='true' />
                        </div>
                        <input
                           id='password'
                           type='password'
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                            className='block w-full px-3 py-2 pl-10 bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm
                            placeholder-[rgba(255,215,0,0.6)] focus:outline-none focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)] sm:text-sm'
                            placeholder='••••••••'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent
                    rounded-md shadow-md text-sm font-medium text-[rgba(72,61,139,0.9)] bg-[rgba(255,215,0,0.9)]
                    hover:bg-[rgba(255,215,0,0.7)] focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-[rgba(255,215,0,0.8)] transition duration-150 ease-in-out disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                            Loading...
                        </>
                    ) : (
                        <>
                            <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                            Login
                        </>
                    )}
                </button>
            </form>

            <p className='mt-8 text-center text-sm text-[rgba(255,215,0,0.7)]'>
                Not a member?{" "}
                <Link
                    to='/signup'
                    className='font-medium text-[rgba(255,215,0,0.9)] hover:text-[rgba(255,215,0,0.7)]'
                >
                    Sign up here <ArrowRight className='inline h-4 w-4' />
                </Link>
            </p>
        </div>
    </motion.div>
</div>
  )
}

export default LoginPage