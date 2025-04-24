import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";

async function getUser() {
    const res = await axios.get(`${BASE_URL}/user`,{
        withCredentials:true
    })
    return res
}

export default {getUser}