import axios from "axios";
import router from "router";
import utils from "utils/utils";
import status from "@/constants/status";

export default function request(config) {
  const instance = axios.create({
    baseURL: "http://192.168.1.103:9999/admins/",
    timeout: 15000,
  });
  instance.defaults.headers["Content-Type"] = "application/json";

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      if (loginInfo) {
        config.headers['Authorization'] = loginInfo.token
      }
      return config;
    },
    (err) => {
      return err;
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            utils.showMessage(status.ERROR, "未授权");
            router.replace({ path: "/login" });
            break;
          case 403:
            utils.showMessage(status.ERROR, "登录已过期");
            router.replace({ path: "/login" });
            break;
          case 404:
            utils.showMessage(status.ERROR, "404");
            break;
          case 500:
            utils.showMessage(status.ERROR, "服务器出错啦");
            break;
          default:
            utils.showMessage(status.ERROR, "网络异常");
            break;
        }
      }
    }
  );

  return instance(config);
}
