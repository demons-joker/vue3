import axios from 'axios';
import qs from 'qs'
import store from '../store';

const service = axios.create({
  timeout: 600000, // 请求超时时间
  withCredentials: true, // 允许携带cookie
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['platform'] = 'web';
    if (store.getters.token) {
      config.headers['Authorization'] = `${store.getters.token}`;
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
// service.interceptors.response.use()

function axiosPost(options) {
  service({
      url: options.url,
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({
        ...options.data
      })
    })
    .then((result) => {
      options.success(result.data)
    }).catch((err) => {
      options.error(err)
    })
}

function axiosGet(options) {
  service(options.url).then((result) => {
    options.success(result.data)
  }).catch((err) => {
    options.error(err)
  })
}

export {
  axiosGet,
  axiosPost
}