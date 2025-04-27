import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { defineStore } from "pinia";

export const useAbsenStore = defineStore("absen", {
  state: () => ({
    absensi: {} as Record<string,
      { HADIR: number; ALPHA: number; IZIN: number; SAKIT: number }
    >,
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
    }
  }
});
