import axios from "axios";
import { GROCERY_BASEURL } from "./Url";


const apiService = axios.create({
    baseURL: "https://api.vizhil.com/",
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const ApiClient = axios.create({
      baseURL: GROCERY_BASEURL,
      timeout: 5000,
      headers: {
          'Content-Type': 'application/json',
      },
  });

  export {apiService,ApiClient};