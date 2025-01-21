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
    _id: string,
    name: string,
    code: string,
    assignedTo:string,
    discountPercentage: string,
    expiryDate: string,
    isActive: boolean
}
interface CartState {
    cartItems: Cart[];
    coupon: Coupon | null,
    couponList: Coupon[],
    totalAmount: number,
    subtotalAmount: number,
    isCouponApplied: boolean,
    addToCart: (product: Cart) => void,
    removeFromCart: (id: string) => void,
    getCoupon: () => void,
    fetchAllCoupons: () => void,
    deleteCoupon: (couponId: string) => void,
    toggleCoupon: (couponId: string) => void,
    createCoupon: (coupon: Coupon) => void,
    applyCoupon: (couponCode: string) => void,
    removeCoupon: () => void,
    getCartItems: () => void,
    calculateTotalAmount: () => void,
    updateQuantity: (id: string, quantity: number) => void,
    clearCart: () => void,
}
export const useCartStore = create<CartState>((set, get) => ({
    cartItems: [],
    couponList: [],
    coupon: null,
    totalAmount: 0,
    subtotalAmount: 0,
    isCouponApplied: false,
    getCoupon: async () => {
        try {
            const res = await axiosInstance.get(`/coupons`);
            const couponList = res.data.data;
            console.log(couponList);
            const i = Math.floor(Math.random() * couponList.length);
            set({ coupon: couponList[i] });
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
    fetchAllCoupons: async () => {
        try {
            const res = await axiosInstance.get(`/coupons/all`);
            const couponList = res.data;
            console.log(couponList);
            set({ couponList: couponList });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },
    toggleCoupon: async (couponId: string) => {
        try {
            const res = await axiosInstance.patch(`/coupons/${couponId}`);
            set((previousState) => ({
                couponList: previousState.couponList.map(coupon => coupon._id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon),
            }));
            toast.success(res.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },
    createCoupon: async (coupon: Coupon) => {
        try {
            const res = await axiosInstance.post('/coupons/create', coupon);
            set((previousState) => ({
                couponList: [...previousState.couponList, res.data.data],
            }));
            toast.success(res.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },
    deleteCoupon: async (couponId: string) => {
        try {
            const res = await axiosInstance.delete(`/coupons/del/${couponId}`);
            set((previousState) => ({
                couponList: previousState.couponList.filter(coupon => coupon._id !== couponId),
            }));
            toast.success(res.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {  // Check if error is an axios error
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
    },
    applyCoupon: async (couponCode: string) => {
        try {
            console.log(couponCode);
            console.log('test1');
            const res = await axiosInstance.post('/coupons/validate', { code: couponCode });
            console.log('test2');
            console.log(res.data);
            set({ coupon: res.data, isCouponApplied: true });
            console.log('test3');
            get().calculateTotalAmount();
            console.log('test4');
            toast.success('Coupon applied successfully');
            console.log('test5');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
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
            console.log(res.data);
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
        try {
            await axiosInstance.patch('/cart/clear-cartItems');
            toast.success('Cart cleared successfully');
            set({ cartItems: [] });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return toast.error(error.response.data.message || 'Something went wrong');
            }
        }
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
            const discount = (totalAmount * Number(coupon.discountPercentage)) / 100;
            totalAmount -= discount;
        }

        set({ subtotalAmount, totalAmount });

    },
}));