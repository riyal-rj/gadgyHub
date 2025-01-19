import {motion}from 'framer-motion'
import { useCartStore } from '../store/cartStore'

const OrderSummary = () => {
    const {totalAmount,subtotalAmount,isCouponApplied,cartItems}=useCartStore();
    const savings=subtotalAmount-totalAmount;
    const formattedSubtotalAmount = subtotalAmount.toFixed(2);
    const formattedTotalAmount = totalAmount.toFixed(2);

    const handlePayment=async()=>{
        
    }

  return (
    <div>OrderSummary</div>
  )
}

export default OrderSummary