import { BASE_URL } from "@/lib/baseUrl";
import type { User } from "@/types/userType";
import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>({
        //state penampung data pengguna sesuai role 
        data:[] as {name:string,total:number}[],
        allDatas:[] as User[],
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
                this.allDatas = res.data.data
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        //delete user berdasarkan id
        async deleteUser(userId:string){
            try {
                const res = await axios.delete(`${BASE_URL}/user/${userId}`,{
                    withCredentials:true
                })
                return res.data
            } catch (error) {
                throw error
            }
        },
        //add user byAdmin
        async addUser(data:{name:string,email:string,password:string,role:string}){
            try {
                const res = await axios.post(`${BASE_URL}/user/create`,data,{
                    withCredentials:true
                })
                return res
            } catch (error) {
                throw error
            }
        }
    }
})