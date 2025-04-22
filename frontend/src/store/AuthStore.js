import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { m } from "framer-motion";

const API_URL = "https://authenticator-app-backend-ol54.onrender.com"; // Replace with your API URL

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    signup: async(email, password, name) => {
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/auth/signup`, {email, password, name});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        }catch(error){
            set({error: error.response.data.message || "Error in signing up", isLoading: false});
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            toast.success("Email verified successful!");
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error in verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async() => {
        set({isCheckingAuth: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/auth/check-auth`);
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        }catch(error){
            set({error: null, isCheckingAuth: false});
        }
    },

    login: async(email, password) => {
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/auth/login`, {email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null});
            toast.success("Login successful!");
        }catch(error){
            set({error: error.response?.data?.message || "Error in logging in", isLoading: false});
            throw error;
        }
    },

    logout: async() => {
        set({isLoading: true, error: null});
        try{
            await axios.post(`${API_URL}/auth/logout`);
            set({user: null, isAuthenticated: false, isLoading: false, error: null});
            toast.success("Logout successful!");
        }catch(error){
            set({error: error.response?.data?.message || "Error in logging out", isLoading: false});
            throw error;
        }
    },

    forgotPassword: async(email) => {
        set({isLoading: true, error: null, message: null});
        try{
            const response = await axios.post(`${API_URL}/auth/forgot-password`, {email});
            set({message: response.data.message, isLoading: false, error: null});
            toast.success("Password reset link sent to your email!");
            return response.data;
        }catch(error){
            set({error: error.response?.data?.message || "Error in sending password reset link", isLoading: false});
            throw error;
        }
    },

    resetPassword: async(token, password) => {
        set({isLoading: true, error: null, message: null});
        try{
            const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, {password});
            set({message: response.data.message, isLoading: false, error: null});
            toast.success("Password reset successful!");
            return response.data;
        }catch(error){  
            set({error: error.response?.data?.message || "Error in resetting password", isLoading: false});
            throw error;
        }
    }
}))
