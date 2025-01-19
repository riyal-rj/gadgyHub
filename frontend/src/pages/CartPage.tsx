import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import CouponCard from "../components/CouponCard";

const CartPage = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return (
    <div className='py-8 md:py-16 bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)] text-[rgba(255,215,0,0.9)]'>
  <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
    <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
      {/* Cart Items Section */}
      <motion.div
        className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl bg-[rgba(44,44,84,0.9)] rounded-lg shadow-lg p-6'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {cart.length === 0 ? (
          <EmptyCartUI />
        ) : (
          <div className='space-y-6'>
            {cart.map((item: any) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        )}
        {cart.length > 0 && <PeopleAlsoBought />}
      </motion.div>

      {/* Order Summary Section */}
      {cart.length > 0 && (
        <motion.div
          className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full bg-[rgba(44,44,84,0.9)] rounded-lg shadow-lg p-6'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OrderSummary />
          <CouponCard />
        </motion.div>
      )}
    </div>
  </div>
</div>

  )
}

export default CartPage
const EmptyCartUI = () => (
    <motion.div
      className='flex flex-col items-center justify-center space-y-6 py-16 bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)] text-[rgba(255,215,0,0.9)]'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cart Icon */}
      <ShoppingCart className='h-24 w-24 text-[rgba(255,215,0,0.9)]' />
  
      {/* Heading */}
      <h3 className='text-3xl font-bold text-[rgba(255,215,0,0.9)]'>Your cart is empty</h3>
  
      {/* Subheading */}
      <p className='text-[rgba(255,215,0,0.7)] text-lg text-center'>
        Looks like you haven’t added anything to your cart yet.
      </p>
  
      {/* Start Shopping Button */}
      <Link
        className='mt-6 rounded-md bg-[rgba(255,215,0,0.9)] px-8 py-3 text-[rgba(44,44,84,0.9)] text-lg font-semibold shadow-md 
        transition-transform transform hover:scale-105 hover:bg-[rgba(255,215,0,0.7)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)]'
        to='/'
      >
        Start Shopping
      </Link>
    </motion.div>
  );
  