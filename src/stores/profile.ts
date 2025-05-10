import { BASE_URL } from "@/lib/baseUrl";
import type { profileType } from "@/types/profileType";
import axios from "axios";
import { defineStore } from "pinia";

export const useProfileStore=defineStore('profile',{
    state:()=>({
        data:{} as profileType
    }),
    actions:{
        async fetchProfile(){
            const res = await axios.get(`${BASE_URL}/profile`,{withCredentials:true})
            this.data = res.data.data
        }
    }
})