import { ChevronLeft, ChevronRight, ShoppingCartIcon, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";

interface Products {
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

interface FeaturedProductsProps {
    featuredProducts: Products[];
}

const FeaturedProducts : React.FC<FeaturedProductsProps>=({featuredProducts})=>{
    const [currentIndex,setCurrentIndex]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(4);

    const {addToCart}=useCartStore();

    useEffect(()=>{
        const handleResize = () => {
            if (window.innerWidth < 640) {
              setItemsPerPage(1);
            } else if (window.innerWidth < 768) {
              setItemsPerPage(2);
            } else if (window.innerWidth < 1024) {
              setItemsPerPage(3);
            } else {
              setItemsPerPage(4);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex+itemsPerPage);
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex-itemsPerPage);
    }

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex + itemsPerPage >= featuredProducts?.length;
    return (
        <div className='py-12'>
  <div className='container mx-auto px-4'>
    <h2 className='text-center text-5xl sm:text-6xl font-bold text-[rgba(255,215,0,0.9)] mb-4'>
      Featured
    </h2>
    <div className='relative'>
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {featuredProducts?.map((product) => (
            <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
              <div className='bg-[rgba(58,58,135,0.9)] backdrop-blur-sm rounded-lg shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl border border-[rgba(72,61,139,0.7)]'>
                <div className='overflow-hidden'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold mb-2 text-[rgba(255,215,0,0.9)]'>{product.name}</h3>
                  <p className='text-[rgba(255,215,0,0.7)] font-medium mb-4'>
                  ₹{product.price}
                  </p>
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
                  <button
                    onClick={() => addToCart(product)}
                    className='w-full bg-[rgba(255,215,0,0.9)] hover:bg-[rgba(255,215,0,0.7)] text-[rgba(44,44,84,0.9)] font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center'
                  >
                    <ShoppingCartIcon className='w-5 h-5 mr-2' />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Navigation Button */}
      <button
        onClick={prevSlide}
        disabled={isStartDisabled}
        className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
          isStartDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgba(217,206,145,0.9)] hover:bg-[rgba(255,215,0,0.7)]'
        }`}
      >
        <ChevronLeft className='w-6 h-6' />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={nextSlide}
        disabled={isEndDisabled}
        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
          isEndDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgba(207,197,139,0.9)] hover:bg-[rgba(255,215,0,0.7)]'
        }`}
      >
        <ChevronRight className='w-6 h-6' />
      </button>
    </div>
  </div>
</div>

    )
}

export default FeaturedProducts