import {
  axiosPost,
  axiosGet
} from '../libs/https';

/**
 * 获取用户分页列表
 * @param {*} data 
 */
function getClientList(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/clientInfoList',
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
 * 根据ClientId获取用户信息
 * @param {*} data 
 */
function getClient(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/clientById?id=${data.id}`,
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
function addClient(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/addClient',
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
function updateClientInfo(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/updateClient',
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
 * 根据ClientId删除用户
 * @param {*} data 
 */
function deleteClientById(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/deleteClientById?id=${data.id}`,
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
  getClientList,
  getClient,
  addClient,
  deleteClientById,
  updateClientInfo
}