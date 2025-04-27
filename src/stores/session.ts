import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { defineStore } from "pinia";

export const useSessionStore = defineStore('session',{
    state: () => ({
        user: null as null | {id: string, name: string, email: string, roles: string},
        loggedIn: false,
    }),
    actions:{

        //cek dia sudah login atau belum
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
        },

        //login user
        async logIn(email:string, password:string){
            try {
                const res = await axios.post(`${BASE_URL}/auth/signin`,{
                    email,
                    password
                },{
                    withCredentials:true,
                })
                return res
            } catch (error) {
                throw error
            }
        },
        
        //logout user
        async logOut(){
            try {
                await axios.post(`${BASE_URL}/auth/logout`, {}, {withCredentials:true})
                this.user = null
                this.loggedIn = false
            } catch (error) {
                console.error('Error logging out:', error)
            }
        }
    }
})