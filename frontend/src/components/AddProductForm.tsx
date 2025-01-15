import {useState} from 'react'
import { motion } from 'framer-motion'
import { PlusSquareIcon,UploadIcon,LoaderPinwheel } from 'lucide-react'
const categories=["Electronics","Phones","Accessories","Laptops","HeadPhones","Laptops"]
const AddProductForm = () => {
    const [newProduct,setAddNewProduct]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
        avgRatings:"",
        image:""
    });

    const loading:boolean=false;
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(name);
    }

    const handleImageChange = (e:any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				// setAddNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};
  return (
    <motion.div
  className='bg-[rgba(72,61,139,0.9)] shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Heading */}
  <h2 className='text-2xl font-semibold mb-6 text-[rgba(255,215,0,0.9)]'>Add New Product</h2>

  {/* Form */}
  <form onSubmit={handleSubmit} className='space-y-4'>
    {/* Product Name */}
    <div>
      <label htmlFor='name' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
        Product Name
      </label>
      <input
        type='text'
        id='name'
        name='name'
        value={newProduct.name}
        onChange={(e) => setAddNewProduct({ ...newProduct, name: e.target.value })}
        className='mt-1 block w-full bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm py-2 px-3 
        text-[rgba(255,215,0,0.9)] placeholder-[rgba(255,215,0,0.6)] focus:outline-none 
        focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)]'
        placeholder='Enter product name'
        required
      />
    </div>

    {/* Description */}
    <div>
      <label htmlFor='description' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
        Description
      </label>
      <textarea
        id='description'
        name='description'
        value={newProduct.description}
        onChange={(e) => setAddNewProduct({ ...newProduct, description: e.target.value })}
        // rows='3'
        className='mt-1 block w-full bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm 
        py-2 px-3 text-[rgba(255,215,0,0.9)] placeholder-[rgba(255,215,0,0.6)] focus:outline-none 
        focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)]'
        placeholder='Enter product description'
        required
      />
    </div>

    {/* Price */}
    <div>
      <label htmlFor='price' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
        Price
      </label>
      <input
        type='number'
        id='price'
        name='price'
        value={newProduct.price}
        onChange={(e) => setAddNewProduct({ ...newProduct, price: e.target.value })}
        step='0.01'
        className='mt-1 block w-full bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm 
        py-2 px-3 text-[rgba(255,215,0,0.9)] placeholder-[rgba(255,215,0,0.6)] focus:outline-none 
        focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)]'
        placeholder='Enter product price'
        required
      />
    </div>

    {/* Category */}
    <div>
      <label htmlFor='category' className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>
        Category
      </label>
      <select
        id='category'
        name='category'
        value={newProduct.category}
        onChange={(e) => setAddNewProduct({ ...newProduct, category: e.target.value })}
        className='mt-1 block w-full bg-[rgba(44,44,84,0.9)] border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm 
        py-2 px-3 text-[rgba(255,215,0,0.9)] placeholder-[rgba(255,215,0,0.6)] focus:outline-none 
        focus:ring-[rgba(255,215,0,0.8)] focus:border-[rgba(255,215,0,0.8)]'
        required
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Image Upload */}
    <div className='mt-1 flex items-center'>
      <input
        type='file'
        id='image'
        className='sr-only'
        accept='image/*'
        onChange={handleImageChange}
      />
      <label
        htmlFor='image'
        className='cursor-pointer bg-[rgba(44,44,84,0.9)] py-2 px-3 border border-[rgba(72,61,139,0.7)] rounded-md shadow-sm 
        text-sm leading-4 font-medium text-[rgba(255,215,0,0.7)] hover:bg-[rgba(44,44,84,0.8)] focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(255,215,0,0.8)]'
      >
        <UploadIcon className='h-5 w-5 inline-block mr-2' />
        Upload Image
      </label>
      {newProduct.image && (
        <span className='ml-3 text-sm text-[rgba(255,215,0,0.6)]'>Image uploaded</span>
      )}
    </div>

    {/* Submit Button */}
    <button
      type='submit'
      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
      shadow-md text-sm font-medium text-[rgba(44,44,84,0.9)] bg-[rgba(255,215,0,0.9)] hover:bg-[rgba(255,215,0,0.7)] 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(255,215,0,0.8)] disabled:opacity-50'
      disabled={loading}
    >
      {loading ? (
        <>
          <LoaderPinwheel className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
          Loading...
        </>
      ) : (
        <>
          <PlusSquareIcon className='mr-2 h-5 w-5' />
          Add Product
        </>
      )}
    </button>
  </form>
</motion.div>

  )
}

export default AddProductForm