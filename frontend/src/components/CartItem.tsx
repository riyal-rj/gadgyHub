import { MinusCircleIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { useCartStore } from "../store/cartStore";

interface Props{
  item:{
    _id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    avgRatings: string;
    image: string;
    isFeatured: boolean;
    quantity: number;
  }
}
const CartItem :React.FC<Props>=({item}) => {
  console.log(item);
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className='rounded-xl border border-[rgba(57,46,124,0.8)] bg-[rgba(44,44,84,0.95)] p-6 shadow-2xl transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'>
  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
    {/* Product Image */}
    <div className='shrink-0 md:order-1'>
      <img className='h-24 w-24 md:h-36 md:w-36 rounded-xl object-cover border border-[rgba(72,61,139,0.7)]' src={item.image} alt={item.name} />
    </div>

    {/* Product Details */}
    <div className='flex-1 space-y-2 md:order-2'>
      <p className='text-lg font-semibold text-[rgba(255,215,0,0.9)] hover:text-[rgba(255,215,0,0.7)] transition-colors duration-200'>
        {item.name}
      </p>
      <p className='text-sm text-[rgba(255,215,0,0.7)] leading-6'>{item.description}</p>
      <button
        className='inline-flex items-center text-sm font-medium text-[rgba(255,69,58,0.9)] hover:text-[rgba(255,69,58,0.7)] transition-colors duration-200'
        onClick={() => removeFromCart(item._id)}
      >
        <Trash2Icon className='mr-1' /> Remove
      </button>
    </div>

    {/* Quantity Controls and Price */}
    <div className='flex flex-col items-end md:order-3 md:flex-row md:items-center md:gap-6'>
      {/* Quantity Controls */}
      <div className='flex items-center gap-3'>
        <button
          className='h-8 w-8 flex items-center justify-center rounded-full border border-[rgba(72,61,139,0.8)] bg-[rgba(44,44,84,0.9)] hover:bg-[rgba(44,44,84,0.7)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,215,0,0.8)]'
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
        >
          <MinusCircleIcon className='text-[rgba(255,215,0,0.9)]' />
        </button>
        <p className='text-lg font-bold text-[rgba(255,215,0,0.9)]'>{item.quantity}</p>
        <button
          className='h-8 w-8 flex items-center justify-center rounded-full border border-[rgba(72,61,139,0.8)] bg-[rgba(44,44,84,0.9)] hover:bg-[rgba(44,44,84,0.7)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,215,0,0.8)]'
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
        >
          <PlusCircleIcon className='text-[rgba(255,215,0,0.9)]' />
        </button>
      </div>

      {/* Product Price */}
      <div>
        <p className='text-lg font-bold text-[rgba(255,215,0,0.9)]'>₹{item.price}</p>
      </div>
    </div>
  </div>
</div>


  )
}

export default CartItem