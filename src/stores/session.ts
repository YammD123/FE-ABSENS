import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { defineStore } from "pinia";

export const useSessionStore = defineStore('session',{
    state: () => ({
        user: null as null | {id: string, name: string, email: string, role: string},
        loggedIn: false,
    }),
    actions:{
        async fetchSession(){
            try {
                const res = await axios(`${BASE_URL}/auth/me`,{withCredentials:true})
                this.user = res.data
                this.loggedIn = true
            } catch (error) {
                this.user = null
                this.loggedIn = false
                console.error('Error fetching session:', error)
            }
        }
    }
})