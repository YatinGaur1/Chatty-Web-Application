import {create} from "zustand"
import {axiosInstance}from "../lib/axios.js"
import {toast} from "react-hot-toast"



export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
     
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth in useauthstore",error.message);
            set({authUser:null})
        }finally{
            set({ischeckingAuth:false})
        }
    },

    signUp:async(data)=>{
        set({isSigningUp:true});
    try {
        const res=await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data});
        toast.success("Account Created Successfully");
    } catch (error) {
        toast.error(error.response.data.message);
        console.log("error occured in signup");
    }finally{
        set({isSigningUp:false});
    }
    },

    logOut:async()=>{
        try {
            await axiosInstance.post("auth/logout");
            set({authUser:null})
            toast.success("LoggedOut Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error occured in logout")
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("LoggedIn Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in login")
        }finally{
            set({isLoggingIn:false})
        }
    }

}));