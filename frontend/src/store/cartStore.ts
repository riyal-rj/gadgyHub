import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';
import axios from 'axios';

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
    discount: number;
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
export const useCartStore = create<CartState>((set, get) => ({
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
            set({ cartItems: res.data.data.cart });
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
    addToCart: async (product: Cart) => {
        try {
            await axiosInstance.post('/cart', { productId: product._id });
            toast.success('Product added to cart successfully');

            set((previousState) => {
                const existingItem = previousState.cartItems.find(item => item._id === product._id);
                const newCart = existingItem ?
                    previousState.cartItems.map(item =>
                        item._id === product._id ?
                            { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    :
                    [...previousState.cartItems, { ...product, quantity: 1 }];
                return { cartItems: newCart };
            });
            get().calculateTotalAmount();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else {
                toast.error('Unexpected error occurred');
            }
        }
    },

    removeFromCart: async (productId: string) => {
        try {
            await axiosInstance.delete(`/cart/`, { data: { productId } });
            set((previousState) => ({
                cartItems: previousState.cartItems.filter(item => item._id !== productId),
            }));
            get().calculateTotalAmount();
            toast.success('Product removed from cart successfully');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
            else {
                toast.error('Unexpected error occurred');
            }
        }
    },

    updateQuantity: async (productId: string, quantity: number) => {
        if (quantity === 0) {
            get().removeFromCart(productId);
            return;
        }
        else {
            const res = await axiosInstance.put(`/cart/${productId}`, { quantity });
            set(previousState => ({
                cartItems: previousState.cartItems.map(item => item._id === productId ? res.data.data : item),
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
            const discount = (totalAmount * coupon.discount) / 100;
            totalAmount -= discount;
        }

        set({ subtotalAmount, totalAmount });

    },




}))