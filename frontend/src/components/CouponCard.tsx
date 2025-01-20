import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';
const CouponCard = () => {
  const [userInputCode, setUserInputCode] = useState('');
  const {coupon, isCouponApplied, applyCoupon, removeCoupon, getCoupon} = useCartStore();
  useEffect(() => {
    getCoupon();
  }, [getCoupon]);
  
  useEffect(() => {
    if(coupon)
      setUserInputCode(coupon.code);
  },[coupon]);

  const handleApplyCoupon = () => {
    applyCoupon(userInputCode);
  }
  const handleRemoveCoupon = () => {
    if(isCouponApplied){
      removeCoupon();
  }
  }  

  return (
    <motion.div
      className='space-y-4 rounded-lg border border-[rgba(72,61,139,0.7)] bg-[rgba(44,44,84,0.9)] p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='space-y-4'>
        {/* Voucher Input */}
        <div>
          <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
            Do you have a voucher or gift card?
          </label>
          <input
            type='text'
            id='voucher'
            className='block w-full rounded-lg border border-[rgba(72,61,139,0.7)] bg-[rgba(44,44,84,0.9)] 
        p-2.5 text-sm text-white placeholder-[rgba(255,215,0,0.7)] focus:border-[rgba(255,215,0,0.9)] 
        focus:ring-[rgba(255,215,0,0.9)]'
            placeholder='Enter code here'
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        {/* Apply Coupon Button */}
        <motion.button
          type='button'
          className='flex w-full items-center justify-center rounded-lg bg-[rgba(255,215,0,0.9)] px-5 py-2.5 text-sm font-medium text-[rgba(44,44,84,0.9)] hover:bg-[rgba(255,215,0,0.7)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)] transition-all'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>

      {/* Applied Coupon */}
      {isCouponApplied && coupon && (
        <div className='mt-4'>
          <h3 className='text-lg font-medium text-[rgba(255,215,0,0.9)]'>Applied Coupon</h3>
          <p className='mt-2 text-sm text-[rgba(255,215,0,0.7)]'>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>

          {/* Remove Coupon Button */}
          <motion.button
            type='button'
            className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
        px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
        focus:ring-4 focus:ring-red-300 transition-all'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {/* Available Coupon */}
      {coupon && !isCouponApplied && (
        <div className='mt-4'>
          <h3 className='text-lg font-medium text-[rgba(255,215,0,0.9)]'>Your Available Coupon:</h3>
          <p className='mt-2 text-sm text-[rgba(255,215,0,0.7)]'>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>

  )
}

export default CouponCard