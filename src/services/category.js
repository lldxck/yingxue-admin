import request from './request'
import method from "constants/method";
import api from "constants/api";

/**
 * 分类列表
 * @returns 
 */
export function categorys() {
  return request({
    url: api.CATEGORY_API,
    method: method.GET,
  })
}

/**
 * 添加分类
 * @param {*} params 
 * @returns 
 */
export function categoryAdd(params) {
  return request({
    url: api.CATEGORY_ADD_API,
    method: method.POST,
    data: params
  })
}

/**
 * 获取一级分类
 * @returns 
 */
export function categoryOne() {
  return request({
    url: api.CATEGORY_ONE_API,
    method: method.GET,
  })
}

/**
 * 删除分类
 * @param {*} id 
 * @returns 
 */
export function delCategory(id) {
  return request({
    url: api.CATEGORY_DELETE_API + id,
    method: method.DELETE,
  })
}

/**
 * 修改分类
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function updateCategory(params) {
  return request({
    url: api.CATEGORY_UPDATE_API,
    method: method.POST,
    data: params
  })
}