import { motion } from "framer-motion";
import { HeartIcon,Trash2Icon } from "lucide-react";
import { useProductStore } from "../store/productStore.ts";
const ProductList = () => {
  const {deleteProduct,toggleFeaturedProduct,products}=useProductStore();
  return (
    <motion.div
  className='bg-[rgba(44,44,84,0.9)] shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <table className='min-w-full divide-y divide-[rgba(72,61,139,0.7)]'>
    {/* Table Header */}
    <thead className='bg-[rgba(72,61,139,0.8)]'>
      <tr>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-[rgba(255,215,0,0.9)] uppercase tracking-wider'
        >
          Product
        </th>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-[rgba(255,215,0,0.9)] uppercase tracking-wider'
        >
          Price
        </th>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-[rgba(255,215,0,0.9)] uppercase tracking-wider'
        >
          Category
        </th>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-[rgba(255,215,0,0.9)] uppercase tracking-wider'
        >
          Featured
        </th>
        <th
          scope='col'
          className='px-6 py-3 text-left text-xs font-medium text-[rgba(255,215,0,0.9)] uppercase tracking-wider'
        >
          Actions
        </th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className='bg-[rgba(44,44,84,0.9)] divide-y divide-[rgba(72,61,139,0.7)]'>
      {products?.map((product) => (
        <tr key={product._id} className='hover:bg-[rgba(72,61,139,0.8)]'>
          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <img
                  className='h-10 w-10 rounded-full object-cover'
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-[rgba(255,215,0,0.9)]'>{product.name}</div>
              </div>
            </div>
          </td>

          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-[rgba(255,215,0,0.7)]'>
            ₹{product.price}</div>
          </td>

          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-[rgba(255,215,0,0.7)]'>{product.category}</div>
          </td>

          <td className='px-6 py-4 whitespace-nowrap'>
            <button
              onClick={() => toggleFeaturedProduct(product._id)}
              className={`p-1 rounded-full ${
                product.isFeatured
                  ? "bg-[rgba(255,215,0,0.9)] text-[rgba(44,44,84,0.9)]"
                  : "bg-[rgba(72,61,139,0.7)] text-[rgba(255,215,0,0.7)]"
              } hover:bg-[rgba(255,215,0,0.8)] transition-colors duration-200`}
            >
              <HeartIcon className='h-5 w-5' />
            </button>
          </td>

          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
            <button
              onClick={() => deleteProduct(product._id)}
              className='text-[rgba(255,69,58,0.9)] hover:text-[rgba(255,69,58,0.7)]'
            >
              <Trash2Icon className='h-5 w-5' />
            </button>
          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
</motion.div>

  )
}

export default ProductList