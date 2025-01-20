import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { MoveRight, } from 'lucide-react';
import { Link } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import axiosInstance from '../lib/axios';
const stripePromise=loadStripe('pk_test_51Qc9SrA3rQ23BCs54seJAq8vCag4gH2r1JYE1MVrk9phJyh9THJ9KhCBSkQa3D7azUCDA1MWQKr66eRltiw6BgX700Efm01MCT')
const OrderSummary = () => {
  const { totalAmount, subtotalAmount, coupon, isCouponApplied ,cartItems} = useCartStore();
  const savings = subtotalAmount - totalAmount;
  const formattedTotalAmount = totalAmount?.toFixed(2);
  const formattedSubtotalAmount = subtotalAmount?.toFixed(2);
  const formattedSavings = savings?.toFixed(2);

  const handlePayment = async () => {
   try {
     const stripe=await stripePromise;
     console.log(cartItems, coupon);
     const res=await axiosInstance.post('/payments/checkout',{
       listOfProducts:cartItems,
       code:coupon?coupon.code : null,
     });
     const session=res.data;
     console.log('Session: ',session);
     const result=await stripe?.redirectToCheckout({sessionId:session.sessionId});
     console.log(result);
     
   } catch (error) {
     console.error(error);
   }
  }

  return (
    <motion.div
      className='space-y-4 rounded-lg border border-[rgba(72,61,139,0.8)] bg-[rgba(44,44,84,0.95)] p-6 shadow-lg sm:p-8 transition-shadow duration-300 hover:shadow-2xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <p className='text-xl font-semibold text-[rgba(255,215,0,0.9)]'>Order Summary</p>

      {/* Summary Details */}
      <div className='space-y-4'>
        <div className='space-y-2'>
          {/* Original Price */}
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-[rgba(255,215,0,0.7)]'>Original Price</dt>
            <dd className='text-base font-medium text-[rgba(255,215,0,0.9)]'>₹{formattedSubtotalAmount}</dd>
          </dl>

          {/* Savings */}
          {savings > 0 && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-[rgba(255,215,0,0.7)]'>Savings</dt>
              <dd className='text-base font-medium text-[rgba(255,215,0,0.9)]'>-₹{formattedSavings}</dd>
            </dl>
          )}

          {/* Coupon */}
          {coupon && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-[rgba(255,215,0,0.7)]'>Coupon ({coupon.code})</dt>
              <dd className='text-base font-medium text-[rgba(255,215,0,0.9)]'>-{coupon.discountPercentage}%</dd>
            </dl>
          )}

          {/* Total */}
          <dl className='flex items-center justify-between gap-4 border-t border-[rgba(72,61,139,0.7)] pt-2'>
            <dt className='text-base font-bold text-[rgba(255,215,0,0.9)]'>Total</dt>
            <dd className='text-base font-bold text-[rgba(255,215,0,0.9)]'>₹{formattedTotalAmount}</dd>
          </dl>
        </div>

        {/* Proceed to Checkout Button */}
        <motion.button
          className='flex w-full items-center justify-center rounded-lg bg-[rgba(255,215,0,0.9)] px-5 py-3 text-sm font-medium text-[rgba(44,44,84,0.9)] hover:bg-[rgba(255,215,0,0.7)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)] transition-all'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        {/* Continue Shopping */}
        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-[rgba(255,215,0,0.7)]'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-[rgba(255,215,0,0.9)] underline hover:text-[rgba(255,215,0,0.7)] hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>

  )
}

export default OrderSummary