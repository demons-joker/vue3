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
    console.log(store);
    console.log(store.getters.token);
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    }
    console.log(config);
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
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