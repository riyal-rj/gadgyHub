import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../store/productStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/Electronics", name: "Electronics", imageUrl: "/electronics.webp" },
  { href: "/Cameras", name: "Cameras", imageUrl: "/cameras.avif" },
  { href: "/Laptops", name: "Laptops", imageUrl: "/laptops.webp" },
  { href: "/Accessories", name: "Accessories", imageUrl: "/accessories.avif" },
  { href: "/Headphones", name: "Headphones", imageUrl: "/headphones.jpg" },
  { href: "/Phones", name: "Phones", imageUrl: "/phones.jpg" },
];

const Home = () => {
  const { products,fetchFeaturedProducts,loading } = useProductStore();
  
  useEffect(() => {
    fetchFeaturedProducts();
  },[fetchFeaturedProducts]);

  return (
    <div className='relative min-h-screen text-[rgba(255,215,0,0.9)] overflow-hidden bg-[rgba(44,44,84,0.9)]'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Heading */}
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-[rgba(255,215,0,0.9)] mb-4'>
          Your Gadget Playground
        </h1>
        {/* Subtitle */}
        <p className='text-center text-xl text-[rgba(255,215,0,0.7)] mb-12'>
          Level Up with Next-Gen Gear
        </p>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {/* Optional Featured Products */}
        {!loading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
      </div>
    </div>

  )
}

export default Home