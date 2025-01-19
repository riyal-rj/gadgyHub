import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import {toast} from 'react-hot-toast';
import axios from 'axios';

type Cart={
    _id: string,
    name: string,
    description: string,
    price: string,
    category: string,
    avgRatings: string,
    image: string,
    isFeatured: boolean
    quantity:number
}
type Coupon = {
    discount: number;
}
interface CartState{
    cartItems:Cart[];
    coupon:Coupon|null,
    totalAmount:number,
    subtotalAmount:number,
    isCouponApplied:boolean,
    addToCart:(product:Cart)=>void,
    removeFromCart:(id:string)=>void,
    getCoupon:()=>void,
    applyCoupon:(couponCode:string)=>void,
    removeCoupon:()=>void,
    getCartItems:()=>void,
    calculateTotalAmount:()=>void,
    updateQuantity:(id:string,quantity:number)=>void,
    clearCart:()=>void,
}
export const useCartStore=create<CartState>((set,get)=>({
    cartItems:[],
    coupon:null,
    totalAmount:0,
    subtotalAmount:0,
    isCouponApplied:false,
    addToCart:async (product:Cart)=>{
        try {
            await axiosInstance.post('/cart',{productId:product._id});
            toast.success('Product added to cart successfully');
            set((previousState)=>{
                const existingItem=previousState.cartItems.findIndex(item=>item._id===product._id);
                if(existingItem>-1){
                    previousState.cartItems[existingItem].quantity++;
                }
                else
                {
                    previousState.cartItems.push({...product,quantity:1});
                }
                get().calculateTotalAmount();
                return {...previousState};
            });
        } catch (error) {
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    removeFromCart:async (productId:string)=>{
        try {
            const res=await axiosInstance.delete(`/cart/`,{data:{productId}});
            toast.success(res.data.message);
            set((previousState)=>{
                const existingItem=previousState.cartItems.findIndex(item=>item._id===productId);
                if(existingItem>-1){
                    previousState.cartItems.splice(existingItem,1);
                }
                get().calculateTotalAmount();
                return {...previousState};
            });
        } catch (error) {
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    removeCoupon:async ()=>{
        set({coupon:null,isCouponApplied:false});
        get().calculateTotalAmount();
        toast.success('Coupon removed successfully');
    },
    applyCoupon:async(couponCode:string)=>{
        try {
            const res=await axiosInstance.post('/coupons/validate',{couponCode});
            set({isCouponApplied:true});
            get().calculateTotalAmount();
            toast.success(res.data.message);
        } catch (error) {
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    calculateTotalAmount:async()=>{
        const {cartItems}=get();
        let totalAmount:number=0;
        let subtotalAmount:number=0;
        for(let i=0;i<cartItems.length;i++)
        {
            totalAmount+=Number(cartItems[i].price)*cartItems[i].quantity;
            subtotalAmount+=Number(cartItems[i].price)*cartItems[i].quantity;
        }
        if(get().isCouponApplied)
        {
            totalAmount-=(totalAmount*Number(get().coupon?.discount))/100;
        }
        set({totalAmount:totalAmount,subtotalAmount:subtotalAmount});
        
    },
    getCoupon:async ()=>{
        try{
            const res=await axiosInstance.get(`/coupons`);
            set({coupon:res.data.data.coupon});
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    getCartItems:async()=>{
        try
        {
            const res=await axiosInstance.get('/cart');
            set({cartItems:res.data.data.cart});
            get().calculateTotalAmount();
        }
        catch(error)
        {
            if(axios.isAxiosError(error) && error.response){
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
    updateQuantity:async(productId:string,quantity:number)=>{
        if(quantity===0)
        {
            get().removeFromCart(productId);
        }
        else
        {
            const res=await axiosInstance.put(`/cart/${productId}`,{quantity});
            toast.success(res.data.message);
            get().calculateTotalAmount();
        }
    },
    clearCart:async()=>{
        set({cartItems:[],totalAmount:0,subtotalAmount:0});
    },
    

}))