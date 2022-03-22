import request from "./request";
import method from "constants/method";
import api from "constants/api";

/**
 * 登录
 * @param {*} params 
 * @returns 
 */
export function tokens(params) {
  return request({
    url: api.LOGIN_API,
    method: method.POST,
    data: JSON.stringify(params),
  });
}

/**
 * 登出
 * @param {*} token 
 * @returns 
 */
export function loginOut(token) {
  return request({
    url: api.LOGINOUT_API + `/${token}`,
    method: method.DELETE,
    // params: {
    //   token
    // }
  })
}
