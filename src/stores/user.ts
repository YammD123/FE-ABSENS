import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>({
        //state penampung data pengguna sesuai role 
        data:[] as {name:string,total:number}[],
    }),
    actions:{
        // fetch data pengguna sesuai role
        async fetchUser(){
            try {
                const res = await axios.get(`${BASE_URL}/user`,{
                    withCredentials:true,
                })
                const users = res.data.data
                const admin = users.filter((user:{role:string})=>user.role === 'ADMIN').length
                const user = users.filter((user:{role:string})=>user.role === 'USER').length
                // //menghitung total pengguna sesuai role dan menyimpan ke dalam state data
                this.data = [
                    {name:'ADMIN',total:admin},
                    {name:'USER',total:user}
                ]
            } catch (error) {
                throw error
            }
        },
        //fetch semua data pengguna untuk ditampilkan di tabel
        async fetchAllDataUser(type:string){
            try {
                const res = await axios.get(`${BASE_URL}/user/data/user?role=${type}`,{
                    withCredentials:true,
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
    }
})