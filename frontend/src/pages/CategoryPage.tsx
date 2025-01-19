import { useParams } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useEffect } from "react";
import {motion} from 'framer-motion';
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const {fetchProductsByCategory,products}=useProductStore();
    const {category}=useParams();

    useEffect(()=>{
        fetchProductsByCategory(category as string);
    },[fetchProductsByCategory,category])

  return (
    <div className='min-h-screen bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)] text-[rgba(255,215,0,0.9)]'>
  <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
    {/* Heading */}
    <motion.h1
      className='text-center text-4xl sm:text-5xl font-bold text-[rgba(255,215,0,0.9)] mb-8'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {category!.charAt(0).toUpperCase() + category!.slice(1)}
    </motion.h1>

    {/* Product Grid */}
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* No Products Message */}
      {products?.length === 0 && (
        <h2 className='text-3xl font-semibold text-[rgba(255,215,0,0.7)] text-center col-span-full'>
          No products found
        </h2>
      )}

      {/* Product Cards */}
      {products?.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>


  )
}

export default CategoryPage