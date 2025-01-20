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
    isFeatured:boolean,
    quantity:number
}
type productState={
    products:Products[],
    loading:boolean,
    recomendedProducts:Products[],
    setProducts:(products:Products[])=>void,
    addProduct:(productData:Products)=>void,
    deleteProduct:(productId:string)=>void,
    toggleFeaturedProduct:(productId:string)=>void,
    fetchAllProducts:()=>void,
    fetchProductsByCategory:(category:string)=>void
    fetchRecommendedProducts:()=>void
    
}

export const useProductStore=create<productState>((set)=>({
    products:[],
    loading:false,
    recomendedProducts:[],
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
    deleteProduct:async(productId)=>{
        set({loading:true});
        try
        {
            const res=await axiosInstance.delete(`/products/${productId}`);
            set(previousState=>({
                products:previousState.products.filter(product=>product._id!==productId),
                loading:false
            }));
            toast.success(res.data.message);
        }
        catch(error)
        {
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
    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try 
        {
            category=category.charAt(0).toUpperCase()+category.slice(1);
            const res = await axiosInstance.get(`/products/category/${category}`);
            console.log(res.data);
            set({ products: res.data.data.products, loading: false });
        }
        catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    toggleFeaturedProduct:async(productId)=>{
        set({loading:true});
        try
        {
            const res=await axiosInstance.patch(`/products/${productId}`);
            set(previousState=>({
                products:previousState.products.map(product=>
                    product._id===productId?res.data.data:product),
            }));
            toast.success(res.data.message);
            set({loading:false});
        }
        catch(error)
        {
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
    },
    fetchRecommendedProducts: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get('/products/recommended');
            set({ recomendedProducts: res.data.data, loading: false });
        } catch (error) {
            set({ loading: false });
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },
}))