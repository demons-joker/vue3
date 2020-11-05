import {
  axiosPost,
  axiosGet
} from '../libs/https';

/**
 * 登录
 * @param {*} data 
 */
function login(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/login',
      data: data,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      }
    })
  })
}


/**
 * 注册
 * @param {*} data 
 */
function register(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/register',
      data: data,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      }
    })
  })
}





export {
  login,register
}