import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API 함수 모듈화
export const searchAPI = {
  // 게시글 검색
  searchPosts: (query) => {
    return apiClient.get(`/search?query=${encodeURIComponent(query)}`);
  },

  // 전체 아이템 조회
  getAllItems: () => {
    return apiClient.get('/items');
  },

  // ID로 상세 조회
  getItemById: (id) => {
    return apiClient.get(`/items/${id}`);
  },

  // 조회수 증가
  increaseClicked: (id) => {
    return apiClient.put(`/items/${id}/increase-clicked`);
  }
};

export default apiClient;