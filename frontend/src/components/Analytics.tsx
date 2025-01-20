import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { LucideDollarSign, LucideShoppingCart, Package2Icon, Users2Icon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<any>({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState<any[]>([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axiosInstance.get('/analytics/');
        setAnalyticsData(response.data.analyticsData);
        console.log(response.data.dailySalesData);
        setDailySalesData(response.data.dailySalesData);
        console.log(dailySalesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setIsLoading(false);
      }
  }
  console.log(analyticsData);
  fetchAnalytics();
  }, []);
  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[rgba(255,215,0,0.9)]'>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
  {/* Analytics Cards */}
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
    <AnalyticsCard
      title='Total Users'
      value={analyticsData.users.toLocaleString()}
      icon={Users2Icon}
      color='from-[rgba(255,215,0,0.9)] to-[rgba(255,215,0,0.7)]'
    />
    <AnalyticsCard
      title='Total Products'
      value={analyticsData.products.toLocaleString()}
      icon={Package2Icon}
      color='from-[rgba(255,215,0,0.9)] to-[rgba(255,215,0,0.7)]'
    />
    <AnalyticsCard
      title='Total Sales'
      value={analyticsData.totalSales.toLocaleString()}
      icon={LucideShoppingCart}
      color='from-[rgba(255,215,0,0.9)] to-[rgba(255,215,0,0.7)]'
    />
    <AnalyticsCard
      title='Total Revenue'
      value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
      icon={LucideDollarSign}
      color='from-[rgba(255,215,0,0.9)] to-[rgba(255,215,0,0.7)]'
    />
  </div>

  {/* Sales and Revenue Chart */}
  <motion.div
    className='bg-[rgba(44,44,84,0.9)] rounded-lg p-6 shadow-lg border border-[rgba(72,61,139,0.8)]'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.25 }}
  >
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={dailySalesData}>
        <CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
        <XAxis dataKey='name' stroke='rgba(255,215,0,0.7)' />
        <YAxis yAxisId='left' stroke='rgba(255,215,0,0.7)' />
        <YAxis yAxisId='right' orientation='right' stroke='rgba(255,215,0,0.7)' />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(44,44,84,0.9)',
            border: '1px solid rgba(72,61,139,0.8)',
            color: 'rgba(255,215,0,0.9)',
          }}
          labelStyle={{ color: 'rgba(255,215,0,0.9)' }}
        />
        <Legend wrapperStyle={{ color: 'rgba(255,215,0,0.9)' }} />
        <Line
          yAxisId='left'
          type='monotone'
          dataKey='totalSales'
          stroke='rgba(255,215,0,0.9)'
          activeDot={{ r: 19 }}
          name='Sales'
        />
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='totalRevenue'
          stroke='rgba(90,90,200,0.9)'
          activeDot={{ r: 19 }}
          name='Revenue'
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
</div>

  )
}

export default Analytics

const AnalyticsCard = ({ title, value, icon: Icon, color }: any) => (
  <motion.div
  className={`bg-[rgba(49,49,114,0.9)] rounded-lg p-6 shadow-xl overflow-hidden relative ${color}`}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content Section */}
  <div className='flex justify-between items-center'>
    <div className='z-10'>
      <p className='text-[rgba(255,215,0,0.9)] text-sm mb-1 font-semibold'>{title}</p>
      <h3 className='text-[rgba(255,215,0,0.9)] text-3xl font-bold'>{value}</h3>
    </div>
  </div>

  {/* Background Gradient */}
  <div className='absolute inset-0 bg-gradient-to-br from-[rgba(255,215,0,0.7)] to-[rgba(44,44,84,0.7)] opacity-20' />

  {/* Icon */}
  <div className='absolute -bottom-4 -right-4 text-[rgba(44,44,84,0.9)] opacity-50'>
    <Icon className='h-32 w-32' />
  </div>
</motion.div>

)