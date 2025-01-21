import  { useEffect, useState } from 'react';
import { Trash, ToggleLeft, ToggleRight, PlusCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
const GiftCoupon = () => {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    code: '',
    discountPercentage: '',
    expiryDate: '',
    isActive: false,
    assignedTo: '',
  });
  const {fetchAllCoupons,couponList,toggleCoupon,deleteCoupon,createCoupon}=useCartStore();
  useEffect(()=>{
    fetchAllCoupons();
  },[fetchAllCoupons]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCoupon(formData);
    setFormData({ _id: '', name: '', code: '', discountPercentage: '', expiryDate: '' ,isActive:true,assignedTo:''});
    
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[rgba(44,44,84,1)] via-[rgba(44,44,84,0.9)] to-[rgba(44,44,84,0.8)] text-white py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Heading */}
        <h1 className='text-3xl font-bold text-[rgba(255,215,0,0.9)] mb-8'>Manage Coupons</h1>

        {/* Coupon Form */}
        <div className='bg-[rgba(44,44,84,0.9)] p-6 rounded-lg shadow-lg mb-12'>
          <h2 className='text-lg font-semibold text-[rgba(255,215,0,0.9)] mb-4'>Create New Coupon</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>Coupon Name</label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full bg-[rgba(44,44,84,0.8)] text-white border border-[rgba(72,61,139,0.7)] rounded-lg p-2 mt-1'
                  placeholder='Enter coupon name'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>Coupon Code</label>
                <input
                  type='text'
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className='w-full bg-[rgba(44,44,84,0.8)] text-white border border-[rgba(72,61,139,0.7)] rounded-lg p-2 mt-1'
                  placeholder='Enter coupon code'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>Discount (%)</label>
                <input
                  type='number'
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  className='w-full bg-[rgba(44,44,84,0.8)] text-white border border-[rgba(72,61,139,0.7)] rounded-lg p-2 mt-1'
                  placeholder='Enter discount percentage'
                  required
                  min='0'
                  max='100'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-[rgba(255,215,0,0.9)]'>Expiry Date</label>
                <input
                  type='date'
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className='w-full bg-[rgba(44,44,84,0.8)] text-white border border-[rgba(72,61,139,0.7)] rounded-lg p-2 mt-1'
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              className='flex items-center justify-center w-full bg-[rgba(255,215,0,0.9)] text-[rgba(44,44,84,0.9)] font-semibold py-2 px-4 rounded-lg hover:bg-[rgba(255,215,0,0.7)] transition-all'
            >
              <PlusCircle className='mr-2' size={18} />
              Create Coupon
            </button>
          </form>
        </div>

        {/* Coupons Table */}
        <div className='bg-[rgba(44,44,84,0.9)] p-6 rounded-lg shadow-lg'>
          <h2 className='text-lg font-semibold text-[rgba(255,215,0,0.9)] mb-4'>Available Coupons</h2>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Name</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Code</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Discount (%)</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>User</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Expiry</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Status</th>
                <th className='text-[rgba(255,215,0,0.9)] py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {couponList.map((coupon) => (
                <tr key={coupon._id} className='hover:bg-[rgba(44,44,84,0.8)]'>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>{coupon.name}</td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>{coupon.code}</td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>{coupon.discountPercentage}%</td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>{coupon.assignedTo}</td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>
                    {coupon.isActive ? (
                      <ToggleRight
                        className='text-[rgba(255,215,0,0.9)] cursor-pointer'
                        onClick={() => toggleCoupon(coupon._id)}
                      />
                    ) : (
                      <ToggleLeft
                        className='text-gray-400 cursor-pointer'
                        onClick={() => toggleCoupon(coupon._id)}
                      />
                    )}
                  </td>
                  <td className='py-2 px-4 border-b border-[rgba(72,61,139,0.7)]'>
                    <Trash
                      className='text-[rgba(255,69,58,0.9)] cursor-pointer hover:text-[rgba(255,69,58,0.7)]'
                      onClick={() => deleteCoupon(coupon._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GiftCoupon;
