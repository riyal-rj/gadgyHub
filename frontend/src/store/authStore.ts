import {create} from 'zustand';
import axiosInstance from '../lib/axios.ts';
import {toast} from 'react-hot-toast';
import axios from 'axios';

type AuthState={
    user:any,
    loading:boolean,
    checkingAuth:boolean,
    signUp:(username:string,email:string,password:string,confirmPassword:string)=>void,
    login:(email:string,password:string)=>void,
    checkAuth:()=>void,
    logout:()=>void,
}
export const useAuthStore=create<AuthState>((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    signUp:async (username:string,email:string,password:string,confirmPassword:string)=>{
        set({loading:true});
        if(password!==confirmPassword){
            set({loading:false});
            return toast.error('Passwords do not match');
        }
        try {
            const res=await axiosInstance.post('/auth/register',{username,email,password,confirmPassword});
            set({user:res.data.user,loading:false});
            toast.success(res.data.message);
        } catch (error) {
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

    login:async (emailOrUsername:string,password:string)=>{
        set({loading:true});
        try {
            const res=await axiosInstance.post('/auth/login',{emailOrUsername,password});
            set({user:res.data.data.user,loading:false});
            toast.success(res.data.message);
        } catch (error) {
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

    logout:async ()=>{
       try {
        const res=await axiosInstance.post('/auth/logout');
        set({user:null});
        toast.success( res.data.message)
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
    checkAuth:async ()=>{
        set({checkingAuth:true});
        try 
        {
            const res=await axiosInstance.get('/auth/profile');
            // console.log(res.data);
            set({user:res.data.data,checkingAuth:false});
        }
        catch (error) 
        {
            set({checkingAuth:false,user:null});
            if(axios.isAxiosError(error) && error.response){
                 toast.error(error.response.data.message || 'Something went wrong');
            }
            else
            {
                toast.error('Unexpected error occurred');
            }
        }
    },
}))