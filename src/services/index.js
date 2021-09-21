import axios from "axios";
import { getToken } from "../utils/utils";

const instance = axios.create ({
  baseURL: 'https://serverwatchclock.herokuapp.com/api/v1',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});
export const getProduct = () => instance.get('/getproduct');
export const searchProductByName = (params) => instance.post('/getproductbyname',params);
export const authentication = (params) => instance.post('/loginAdmin',params);
export const paginations = (params) => instance.get('/listproduct&page=' + params.page + '&limit=' + params.limit);
export const loadmore = (params) => instance.get('/listproduct&page=' + params.page + '&limit=' + params.limit);
export const getProductById = (params) => instance.get('/getproduct/' + params);


const instanceAuth = axios.create ({
  baseURL: 'https://serverwatchclock.herokuapp.com/api/v1',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  },
});
export const addProduct = (params) => instanceAuth.post('/addProduct', params);
export const deleteProduct = (params) => instanceAuth.delete('/deleteproduct/'+ params);
export const editProduct = (params, _id) => instanceAuth.put('/updateproduct/'+ _id,params);