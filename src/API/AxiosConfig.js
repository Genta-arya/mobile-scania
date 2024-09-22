import axios from 'axios';


const AxiosConfig = axios.create({
  baseURL: 'https://server-scania.vercel.app/api/v1', 

});


export default AxiosConfig;
