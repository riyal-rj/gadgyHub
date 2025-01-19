import { ShoppingCartIcon, Star, BookHeartIcon } from "lucide-react"

type Products={
    _id:string,
    name:string,
    description:string,
    price:string,
    category:string,
    avgRatings:string,
    image:string,
    isFeatured:boolean
}
interface ProductCardProps {
    product:Products
}
const ProductCard = ({product}:ProductCardProps) => {
    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-lg bg-[rgba(72,61,139,0.9)] border-[rgba(72,61,139,0.7)] shadow-lg hover:shadow-2xl transition-shadow duration-300'>
  {/* Product Image */}
  <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
    <img className='object-cover w-full transition-transform duration-300 ease-out hover:scale-105' src={product.image} alt='product image' />
    <div className='absolute inset-0 bg-[rgba(0,0,0,0.3)]' />
  </div>

  {/* Product Details */}
  <div className='mt-4 px-5 pb-5'>
    {/* Product Name */}
    <div className='flex items-center justify-between'>
      <h5 className='text-xl font-semibold tracking-tight text-[rgba(255,215,0,0.9)]'>{product.name}</h5>
      {product.isFeatured && (
        <BookHeartIcon className='text-[rgba(255,215,0,0.9)] h-5 w-5' aria-hidden='true' />
      )}
    </div>

   {/* Average Rating */}
<div className='mt-2 flex items-center'>
  {[...Array(5)].map((_, index) => {
    const avgRating = Number(product.avgRatings); // Ensure avgRatings is a number
    const isFilled = index < Math.floor(avgRating); // Full stars
    const isHalf = index === Math.floor(avgRating) && avgRating % 1 !== 0; // Half star logic
    return (
      <Star
        key={index}
        className={`h-5 w-5 ${isFilled ? 'text-[rgba(255,215,0,0.9)]' : isHalf ? 'text-[rgba(255,215,0,0.5)]' : 'text-gray-600'}`}
        aria-hidden='true'
      />
    );
  })}
  <span className='ml-2 text-sm text-[rgba(255,215,0,0.9)]'>{product.avgRatings} / 5</span>
</div>


    {/* Price */}
    <div className='mt-2 mb-5 flex items-center justify-between'>
      <p>
        <span className='text-3xl font-bold text-[rgba(255,215,0,0.9)]'>₹{product.price}</span>
      </p>
    </div>

    {/* Add to Cart Button */}
    <button
      className='flex items-center justify-center rounded-lg bg-[rgba(255,215,0,0.9)] px-6 py-3 text-center text-sm font-medium
      text-[rgba(44,44,84,0.9)] hover:bg-[rgba(255,215,0,0.7)] focus:outline-none focus:ring-4 focus:ring-[rgba(255,215,0,0.8)] transition-all ease-in-out'
      // onClick={handleAddToCart}
    >
      <ShoppingCartIcon size={22} className='mr-2' />
      Add to cart
    </button>
  </div>
</div>


    )
}

export default ProductCard