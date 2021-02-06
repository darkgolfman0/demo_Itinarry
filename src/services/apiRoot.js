import axios from 'axios'

export const baseURL = 'http://13.229.16.186:5000/'
// export const baseURL = 'http://localhost:5000/'

export default axios.create({
    baseURL: baseURL
})
