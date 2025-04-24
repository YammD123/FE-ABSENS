import { BASE_URL } from "@/lib/baseUrl"
import type { fromDataSignIn } from "@/types/authFormType"
import axios from "axios"


const authFormSignIn = async (data:fromDataSignIn) =>{
    try {
        
        const res = await axios.post(`${BASE_URL}/auth/signin`,data,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        })
        return res
    } catch (error:any) {
        throw error
    }
}

export default {authFormSignIn}