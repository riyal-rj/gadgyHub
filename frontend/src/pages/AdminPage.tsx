import { BarChart4,PlusSquare,ShoppingBasket,LucideGift } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";
import Analytics from "../components/Analytics";
import { useProductStore } from "../store/productStore";
import GiftCoupon from "../components/GiftCoupon";
const tabs=[
    {id:"add",label:'Add Product',icon:PlusSquare},
    {id:"products",label:'Products',icon:ShoppingBasket},
    {id:'analytics',label:'Analytics',icon:BarChart4},
    {id:'coupons',label:'Coupons',icon:LucideGift}
]
const AdminPage = () => {
    const {fetchAllProducts}=useProductStore();
    
    useEffect(()=>{
        fetchAllProducts();
    },[fetchAllProducts]);

    const [activeTab,setActiveTab]=useState("add");
  return (
    <div className='min-h-screen relative overflow-hidden bg-[rgba(44,44,84,0.9)]'>
  <div className='relative z-10 container mx-auto px-4 py-16'>
    {/* Heading */}
    <motion.h1
      className='text-4xl font-bold mb-8 text-[rgba(255,215,0,0.9)] text-center'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Admin Dashboard
    </motion.h1>

    {/* Tabs */}
    <div className='flex justify-center mb-8'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
            activeTab === tab.id
              ? "bg-[rgba(255,215,0,0.9)] text-[rgba(44,44,84,0.9)]"
              : "bg-[rgba(44,44,84,0.7)] text-[rgba(255,215,0,0.7)] hover:bg-[rgba(44,44,84,0.8)]" 
          }`}
        >
          <tab.icon className='mr-2 h-5 w-5' />
          {tab.label}
        </button>
      ))}
    </div>

    {/* Active Tab Content */}
    {activeTab === "add" && <AddProductForm />}
    {activeTab === "products" && <ProductList />}
    {activeTab === "analytics" && <Analytics />}
    {activeTab === "coupons" && <GiftCoupon/>}
  </div>
</div>

  )
}

export default AdminPage