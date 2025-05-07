import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://www.zoozone.ca/api' 
  : 'http://127.0.0.1:5000/api';   

const apiService = {
  getHeroData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hero`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  },

  getCarouselData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/carousel`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-categories`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  },

  getFeaturedItems: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-featured-products`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  },

  signup: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-member`, formData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },


  validateToken: async (token ,role) => {

    const response = await axios.post(`${API_BASE_URL}/validate-token`,  { role }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  updateUserProfile: async (userData , role) => {
    try {
      userData.role = role; 
      const response = await axios.post(`${API_BASE_URL}/update-user`, userData, role);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  },

  getPaymentMethods: async (email, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment-methods/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  updatePaymentMethods: async (paymentData, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/update-payment-methods`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating payment methods:', error);
      throw error;
    }
  },

  getWishlist: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/all-wishlist-items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  addToWishlist: async (productId) => {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${API_BASE_URL}/add-to-wishlist`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${API_BASE_URL}/remove-from-wishlist`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  addReview: async (reviewData) => {
    const token = Cookies.get('token');
    const response = await axios.post(`${API_BASE_URL}/add-review`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    return response.data;
  },

  createOrder: async (orderData, language) => {
    const token = Cookies.get('token');
    const response = await axios.post(
      `${API_BASE_URL}/create-order`,
      { ...orderData, language },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getOrders: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },


  // Method to create a supplier
  async createSupplier(supplierData) {
    const response = await axios.post(`${API_BASE_URL}/create-supplier`, { ...supplierData, role: 'supplier' });
    return response.data;
  },

  // Method to log in a supplier
  async login(email, password, role) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password, role });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || 'Invalid credentials');
    }
  },

  // Method to validate supplier token
  async validateSupplierToken(token) {
    const response = await axios.post(`${API_BASE_URL}/validate-token`, { token });
    return response.data;
  },

  getSupplierProducts: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/get-supplier-products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getSearchItems: async (query) => {
    try {
       { query }
      const response = await axios.get(`${API_BASE_URL}/search/${query}`)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des éléments de recherche:', error);
      throw error;
    }
  },



  updateProduct: async (token, productData) => {
    const response = await axios.put(`${API_BASE_URL}/update-product`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  deleteProduct: async (token, productId) => {
    const response = await axios.delete(`${API_BASE_URL}/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },


  createProduct: async (token, productData) => {
    const response = await axios.post(`${API_BASE_URL}/create-product`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  
  getAllMembers: async () => {
    const token = Cookies.get('token');  // Get the token from the cookies
    return await axios.get(`${API_BASE_URL}/all-members`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
  },

  getAllSuppliers: async () => {
    const token = Cookies.get('token');  // Get the token from the cookies
    return await axios.get(`${API_BASE_URL}/all-suppliers`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    });
  },


  getMessagesWithUser: async (userId) => {
    const token = Cookies.get('token'); // Get the JWT token from cookies
    return await axios.get(`${API_BASE_URL}/get-messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
      },
    });
  },


};

export default apiService;