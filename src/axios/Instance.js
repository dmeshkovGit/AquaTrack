import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aquatrack-api-crcb.onrender.com',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
