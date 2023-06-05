import axios from 'axios';

const API_HOST = 'http://localhost:3010';

export const api = {
  getProducts: (params = {}) => {
    return axios.get(`${API_HOST}/product`, {
      
      params: params.pagination
        ? { pagination: JSON.stringify(params.pagination) }
        : {}
    });
  },
  getCategories: () => {
    return axios.get(`${API_HOST}/category`);
  },
  getCurrencies: () => {
    return axios.get(`${API_HOST}/currency`);
  },
  placeOrder: ({ cartItems, ...userData }) => {
    const requestData = {
      ...userData,
      products: cartItems.map(
        ({ id, quantity, price }) => ({
          id,
          amount: quantity,
          price,
        })
      ),
    };

    return axios.post(`${API_HOST}/order`, requestData).then(
      res => new Promise(
        (resolve) => setTimeout(() => { resolve(res) }, 1000)
      )
    );
  },
};
