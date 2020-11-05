import {
  axiosPost,
  axiosGet
} from '../libs/https';

/**
 * 获取用户分页列表
 * @param {*} data 
 */
function getUserList(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/userInfoList',
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
 * 根据UserId获取用户信息
 * @param {*} data 
 */
function getUser(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/userById?id=${data.userId}`,
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
 * 新增用户
 * @param {*} data 
 */
function addUser(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/addUser',
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
 * 修改用户信息
 * @param {*} data 
 */
function updateUserInfo(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/updateUser',
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
 * 根据UserId删除用户
 * @param {*} data 
 */
function deleteUserById(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/deleteUserById?id=${data.userId}`,
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
  getUserList,
  getUser,
  addUser,
  deleteUserById,
  updateUserInfo
}