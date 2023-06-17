import axios from 'axios'

export const axiosinstance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        Authorization: 'Bearer {token}'
    }
})
