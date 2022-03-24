import request from './request'
import method from "constants/method";
import api from "constants/api";

export function videos(params) {
  return request({
    url: api.VIDEOS_API,
    method: method.GET,
    params,
  })
}