import { Link } from "react-router-dom"
interface Category{
    href:string,
    name:string,
    imageUrl:string
}
const CategoryItem = ({category}:{category:Category}) => {
  return (
    <div className='relative overflow-hidden h-96 w-full rounded-lg group'>
  <Link to={"/category" + category.href}>
    <div className='w-full h-full cursor-pointer'>
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(44,44,84,0.9)] opacity-70 z-10' />
      
      {/* Background Image */}
      <img
        src={category.imageUrl}
        alt={category.name}
        className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
        loading='lazy'
      />
      
      {/* Text Content */}
      <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
        <h3 className='text-[rgba(255,215,0,0.9)] text-2xl font-bold mb-2'>{category.name}</h3>
        <p className='text-[rgba(255,215,0,0.7)] text-sm'>Explore {category.name}</p>
      </div>
    </div>
  </Link>
</div>

  )
}

export default CategoryItem