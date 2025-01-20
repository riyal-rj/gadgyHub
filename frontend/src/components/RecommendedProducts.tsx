import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore"
import LoadingSpinner from "./LoadingSpinner";
import ProductCard from "./ProductCard";
const RecommendedProducts = () => {
  const {fetchRecommendedProducts,recomendedProducts}=useProductStore();
  const [isLoading,setIsLoading]=useState(true);
  useEffect(() => {
    fetchRecommendedProducts();
    setIsLoading(false);
  }, [fetchRecommendedProducts]);

  if(isLoading)
    return <LoadingSpinner/>
  return (
    <div className='mt-8'>
  <h3 className='text-2xl font-semibold text-[rgba(255,215,0,0.9)]'>Recommended Products</h3>
  <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
    {recomendedProducts.slice(0,3).map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
</div>
  )
}

export default RecommendedProducts;