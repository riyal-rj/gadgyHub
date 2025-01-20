import { AlertCircle, ArrowRight, CheckCircle2Icon, HandHeartIcon, LoaderCircle, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart,cartItems} = useCartStore();
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const handleCheckOutSuccess = async (sessionId: string) => {
            try {
                console.log(sessionId);
                await axiosInstance.post('/payments/checkout-success', {
                    sessionId
                });
                console.log("Calling clearCart...");
                clearCart();
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsProcessing(false);
            }
        }
        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        if (sessionId && sessionId.trim().length > 0) {
            handleCheckOutSuccess(sessionId.trim());
        } else {
            setIsProcessing(false);
            setError('Session Id not found or invalid');
        }
    }, [clearCart]);
    console.log(cartItems);
    if (isProcessing) {
        return (
            <div className='h-screen flex items-center justify-center bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)]'>
                <div className='flex flex-col items-center bg-[rgba(44,44,84,0.95)] border border-[rgba(72,61,139,0.8)] rounded-xl shadow-2xl p-8 max-w-md w-full text-center'>
                    {/* Processing Icon */}
                    <LoaderCircle className='text-[rgba(255,215,0,0.9)] w-16 h-16 mb-4 animate-spin' />

                    {/* Message */}
                    <h1 className='text-2xl font-bold text-[rgba(255,215,0,0.9)] mb-2'>
                        Processing Payment...
                    </h1>

                    <p className='text-[rgba(255,215,0,0.7)] text-sm'>
                        Please wait while we securely process your transaction.
                    </p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)]'>
                <div className='flex flex-col items-center bg-[rgba(49,49,112,0.95)] border border-[rgba(72,61,139,0.8)] rounded-xl shadow-2xl p-8 max-w-md w-full text-center'>
                    {/* Error Icon */}
                    <AlertCircle className='text-[rgba(255,69,58,0.9)] w-16 h-16 mb-4' />

                    {/* Error Title */}
                    <h1 className='text-2xl font-bold text-[rgba(255,215,0,0.9)] mb-2'>Oops! Something went wrong.</h1>

                    {/* Error Message */}
                    <p className='text-[rgba(255,215,0,0.7)] text-sm mb-6'>
                        {`Error: ${error}`}
                    </p>

                    {/* Retry Button */}
                    <button
                        className='bg-[rgba(255,215,0,0.9)] hover:bg-[rgba(255,215,0,0.7)] text-[rgba(44,44,84,0.9)] font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)]'
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCcw className='inline-block mr-2' size={18} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className='h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)]'>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={0.1}
                style={{ zIndex: 99 }}
                numberOfPieces={700}
                recycle={false}
            />

            <div className='max-w-md w-full bg-[rgba(50,50,114,0.95)] rounded-xl shadow-2xl overflow-hidden relative z-10'>
                <div className='p-6 sm:p-8'>
                    {/* Success Icon */}
                    <div className='flex justify-center'>
                        <CheckCircle2Icon className='text-[rgba(255,215,0,0.9)] w-16 h-16 mb-4' />
                    </div>

                    {/* Heading */}
                    <h1 className='text-2xl sm:text-3xl font-bold text-center text-[rgba(255,215,0,0.9)] mb-2'>
                        Purchase Successful!
                    </h1>

                    {/* Message */}
                    <p className='text-[rgba(255,215,0,0.7)] text-center mb-2'>
                        Thank you for your order. {"We're"} processing it now.
                    </p>
                    {/* Order Details */}
                    <div className='bg-[rgba(44,44,84,0.8)] rounded-lg p-4 mb-6'>
                        <div className='flex items-center justify-between mb-2'>
                            <span className='text-sm text-[rgba(255,215,0,0.7)]'>Order number</span>
                            <span className='text-sm font-semibold text-[rgba(255,215,0,0.9)]'>#12345</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-[rgba(255,215,0,0.7)]'>Estimated delivery</span>
                            <span className='text-sm font-semibold text-[rgba(255,215,0,0.9)]'>3-5 business days</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='space-y-4'>
                        <button
                            className='w-full bg-[rgba(255,215,0,0.9)] hover:bg-[rgba(255,215,0,0.7)] text-[rgba(44,44,84,0.9)] font-bold py-2 px-4
          rounded-lg transition duration-300 flex items-center justify-center shadow-md focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)]'
                        >
                            <HandHeartIcon className='mr-2' size={18} />
                            Thanks for trusting us!
                        </button>
                        <Link
                            to={"/"}
                            className='w-full bg-[rgba(44,44,84,0.8)] hover:bg-[rgba(44,44,84,0.7)] text-[rgba(255,215,0,0.9)] font-bold py-2 px-4 
          rounded-lg transition duration-300 flex items-center justify-center shadow-md focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)]'
                        >
                            Continue Shopping
                            <ArrowRight className='ml-2' size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PurchaseSuccessPage