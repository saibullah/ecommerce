import axios from "axios"

const api = axios.create({
    baseURL:" https://backend-prac-8glk.onrender.com/api"
})
export default api