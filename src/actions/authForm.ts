import axios from "axios"

type fromDataSignIn={
    email:string,
    password:string
}

const BASE_URL = import.meta.env.VITE_BASE_URL
const authFormSignIn = async (data:fromDataSignIn) =>{
    const res = await axios.post(`${BASE_URL}/signin`,)
    return res
}

export default {authFormSignIn}