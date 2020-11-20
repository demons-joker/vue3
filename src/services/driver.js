import {
  axiosPost,
  axiosGet
} from '../libs/https';

/**
 * 获取用户分页列表
 * @param {*} data 
 */
function getDriverList(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/driverInfoList',
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
 * 根据DriverId获取用户信息
 * @param {*} data 
 */
function getDriver(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/driverById?id=${data.driverId}`,
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
function addDriver(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/addDriver',
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
function updateDriverInfo(data) {
  return new Promise((resolve, reject) => {
    axiosPost({
      url: '/user/updateDriver',
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
 * 根据DriverId删除用户
 * @param {*} data 
 */
function deleteDriverById(data) {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: `/user/deleteDriverById?id=${data.driverId}`,
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
  getDriverList,
  getDriver,
  addDriver,
  deleteDriverById,
  updateDriverInfo
}