/* eslint-disable linebreak-style,indent */
import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error.response);
    if (error.response.status == 500 && error.response.data.status >= 40000) {
      // 业务异常
    } else {
      //系统异常
    }
    return Promise.reject(error);
  }
)

export default service;
