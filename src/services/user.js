import request from './request'
import method from "constants/method";
import api from "constants/api";

export function users(params) {
  return request({
    url: api.USERS_API,
    method: method.GET,
    params: params,
  })
}