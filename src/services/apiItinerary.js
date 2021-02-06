import axios from 'axios'
import { baseURL } from './apiRoot'

const combineUrl = (path) => `${baseURL}${path}`

export const request_customer = axios.get(combineUrl('api/customer/'))
export const request_accom = axios.get(combineUrl('api/accommodation/'))
export const request_poi = axios.get(combineUrl('api/poi/'))
export const request_transport = axios.get(combineUrl('api/transportation/'))
export const request_itinerary = axios.get(combineUrl('api/itinerary/'))

export const itnCallAll = () => axios.all([
    request_customer, 
    request_accom, 
    request_poi, 
    request_transport, 
    request_itinerary
]).then(axios.spread(async (...response) => {
    const response_customer = await response[0];
    const response_accom = await response[1];
    const response_poi = await response[2];
    const response_transport = await response[3];
    const response_itinerary = await response[4];

    return {
        customer: response_customer.data,
        accommodation: response_accom.data,
        poi: response_poi.data,
        transpotation: response_transport.data,
        itinerary: response_itinerary.data,
    }
})).catch(error => {
    console.error(error);
    return { error: error }
})