import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {persist} from 'zustand/middleware';

type Cart = {
    _id: string,
    name: string,
    description: string,
    price: string,
    category: string,
    avgRatings: string,
    image: string,
    isFeatured: boolean
    quantity: number
}
type Coupon = {
    _id: string,
    name: string,
    code: string,
    discountPercentage: number,
    expiryDate: Date
}
interface CartState {
    cartItems: Cart[];
    coupon: Coupon | null,
    totalAmount: number,
    subtotalAmount: number,
    isCouponApplied: boolean,
    addToCart: (product: Cart) => void,
    removeFromCart: (id: string) => void,
    getCoupon: () => void,
    applyCoupon: (couponCode: string) => void,
    removeCoupon: () => void,
    getCartItems: () => void,
    calculateTotalAmount: () => void,
    updateQuantity: (id: string, quantity: number) => void,
    clearCart: () => void,
}
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
    cartItems: [],
    coupon: null,
    totalAmount: 0,
    subtotalAmount: 0,
    isCouponApplied: false,
    getCoupon: async () => {
        try {
            const res = await axiosInstance.get(`/coupons`);
            set({ coupon: res.data.data.coupon });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else {
                toast.error('Unexpected error occurred');
            }
        }
    },
    applyCoupon: async (couponCode: string) => {
        try {
            const res = await axiosInstance.post('/coupons/validate', { couponCode });
            set({ coupon: res.data.data.coupon, isCouponApplied: true });
            get().calculateTotalAmount();
            toast.success('Coupon applied successfully');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else {
                toast.error('Unexpected error occurred');
            }
        }
    },
    removeCoupon: async () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotalAmount();
        toast.success('Coupon removed successfully');
    },

    getCartItems: async () => {
        try {
            const res = await axiosInstance.get('/cart');
            console.log(res.data.data);
            set({ cartItems: res.data.data });
            get().calculateTotalAmount();
        }
        catch (error) {
            set({ cartItems: [] });
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else {
                toast.error('Unexpected error occurred');
            }
        }
    },
    clearCart: async () => {
        set({ cartItems: [], coupon: null, totalAmount: 0, subtotalAmount: 0 });
    },
    addToCart: async (product) => {
        try {
            console.log(product);
            await axiosInstance.post('/cart', { productId: product._id });
            toast.success('Product added to cart successfully');

            set((previousState) => {
                const existingItem = previousState.cartItems.find(item => item._id === product._id);
                // console.log(existingItem);
                const newCart = existingItem ?
                    previousState.cartItems.map(item =>
                        item._id === product._id ?
                            { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    :
                    [...previousState.cartItems, { ...product, quantity: 1 }];
                    console.log(newCart);
                return { cartItems: newCart };
            });
            get().calculateTotalAmount();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },

    removeFromCart: async (productId: string) => {
            await axiosInstance.delete(`/cart/`, { data: { productId } });
            set((previousState) => ({
                cartItems: previousState.cartItems.filter(item => item._id !== productId),
            }));
            get().calculateTotalAmount();
           
    },

    updateQuantity: async (productId: string, quantity: number) => {
        console.log(productId, quantity);
        if (quantity === 0) {
            get().removeFromCart(productId);
            return;
        }
        else {
            console.log(productId);
            const res = await axiosInstance.put(`/cart/${productId}`, { quantity });
            console.log(res.data);
            set(previousState => ({
                cartItems: previousState.cartItems.map(item => item._id === productId ? { ...item, quantity } : item),
            }));
            get().calculateTotalAmount();
            toast.success('Quantity updated successfully');
        }
    },


    calculateTotalAmount: async () => {
        const { cartItems, coupon } = get();
        const safeCartItems = cartItems || []; // Fallback to an empty array
        const subtotalAmount = safeCartItems.reduce(
            (sum, item) => sum + parseFloat(item.price) * item.quantity,
            0
        );
        let totalAmount = subtotalAmount;

        if (coupon) {
            const discount = (totalAmount * coupon.discountPercentage) / 100;
            totalAmount -= discount;
        }

        set({ subtotalAmount, totalAmount });

    },
}),
{
    name: 'cart-storage',
    partialize: (state) => ({ cartItems: state.cartItems , coupon: state.coupon, totalAmount: state.totalAmount, subtotalAmount: state.subtotalAmount, isCouponApplied: state.isCouponApplied }),
}
));