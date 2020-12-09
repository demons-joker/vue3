import {
  axiosPost,
  axiosGet
} from '../libs/https';

/**
 * 获取用户分页列表
 * @param {*} data 
 */
function getOrderInfoList(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/orderAllList',
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
  getOrderInfoList,
}