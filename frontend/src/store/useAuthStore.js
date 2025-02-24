import {create} from "zustand"
import {axiosInstance}from "../lib/axios.js"
import {toast} from "react-hot-toast"



export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
     
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth in useauthstore",error.response.data.message);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
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

    logIn:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data);
            console.log(res);
            set({authUser:res.data});
            toast.success("LoggedIn Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in login")
            
        }finally{
            set({isLoggingIn:false})
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
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data})
            toast.success("Upload Profile Successfully");
        } catch (error) {
            console.log("Error in updateProfile in usaAuthStore",error.message);
            console.log(error);
            toast.error(error.message);
        }finally{
            set({isUpdatingProfile:false})
        }
    }
    

}));