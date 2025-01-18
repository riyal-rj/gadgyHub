import {create} from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';
import axios from 'axios';

interface Products{
    _id:string,
    name:string,
    description:string,
    price:string,
    avgRatings:string,
    image:string,
    category:string,
    isFeatured:boolean
}
type productState={
    products:Products[],
    loading:boolean,
  
    setProducts:(products:Products[])=>void,
    addProduct:(productData:Products)=>void,
    deleteProduct:(id:string)=>void,
    toggleFeaturedProduct:(id:string)=>void,
    fetchAllProducts:()=>void,
    
}

export const useProductStore=create<productState>((set)=>({
    products:[],
    loading:false,
    setProducts:(products)=>set({products}),

    addProduct:async(productData)=>{
        set({loading:true});
        try{
            const res=await axiosInstance.post('/products',productData);
            set(previousState=>({
                products:[...previousState.products,res.data.data],
                loading:false
            }));
            toast.success(res.data.message);
        }catch(error){
            set({loading:false});
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },

    deleteProduct:async(id)=>{
        console.log(id);
    },

    toggleFeaturedProduct:async(id)=>{
        console.log(id);
    },

    fetchAllProducts:async()=>{
        set({loading:true});
        try{
            const res=await axiosInstance.get('/products');
            set({products:res.data.data,loading:false});
        }catch(error){
            set({loading:false});
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    }
}))