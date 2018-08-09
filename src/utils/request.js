// import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url

  timeout: 15000, // 请求超时时间
})

// service.defaults.headers.common['Authorization'] = getToken();
// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(config.method === 'post') {
    let obj = JSON.parse(config.data)
    obj.token  = sessionStorage.getItem('token');
    config.data = JSON.stringify(obj)
  }
  return config
}, error => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if(Number(res.resultcode)==404||Number(res.resultcode)==405){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('admin')
      alert('token已过期!请重新登录')
      location.reload();
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
