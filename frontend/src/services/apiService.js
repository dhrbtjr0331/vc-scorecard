import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Adjust to your Django API's URL
    withCredentials: true,  // This is crucial for sending cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

export const loginUser = async (username, password) => {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
    });

    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

axios.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                const { data } = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                localStorage.setItem('accessToken', data.access);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
};
// Register API function
export const registerUser = async (firstname, lastname, username, password, retypePassword, isAdmin) => {
    try {
        const response = await api.post('register/', {
            firstname,
            lastname,
            username,
            password,
            retypePassword,
            isAdmin,
        });
        return response.data;
    } catch (err) {
        throw err.response ? err.response.data: { error: 'An unexpected error occured.' };
    }
};

export default api;