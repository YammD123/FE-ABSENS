import { BASE_URL } from "@/lib/baseUrl";
import type { absensDataType, absensTodayDataType } from "@/types/absenType";
import axios from "axios";
import { defineStore } from "pinia";

export const useAbsenStore = defineStore("absen", {
  state: () => ({
    absensi: {} as Record<string,
      { HADIR: number; ALPHA: number; IZIN: number; SAKIT: number }
    >,
    absensData:[] as absensDataType[],
    absenTodayData:[] as absensTodayDataType[]
  }),
  actions:{
    async fetchAbsen(){
        try {
            const res = await axios.get(`${BASE_URL}/absens`,{
                withCredentials:true,
            })
            this.absensi = res.data.data
        } catch (error) {
            throw error
        }
    },
    async fetchAbsenByUser(){
      try {
        const res = await axios.get(`${BASE_URL}/absens/user`,{
          withCredentials:true,
        })
        this.absensData = res.data.data
      } catch (error) {
        throw error
      }
    },
    async absenUser(status:string){
      try {
        const res = await axios.post(`${BASE_URL}/absens/create/absens-today`,{status},{
          withCredentials:true
        })
        return res.data
      } catch (error) {
        throw error
      }
    },
    async getAbsenToday(){
      try {
        const res = await axios.get(`${BASE_URL}/absens/today`,{
          withCredentials:true
        })
        this.absenTodayData = res.data.data
      } catch (error) {
        throw error
      }
    },
    async addAbsens(){
      try {
        const res = await axios.post(`${BASE_URL}/absens/create/absens`,{},{
          withCredentials:true
        })
        return res
      } catch (error) {
        console.log('error')
        throw error
      }
    }
  }
});
