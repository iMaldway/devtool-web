import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../store/config";

// create an axios instance
const service = axios.create({
  baseURL: config.url, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000000, // request timeout
  headers: {
    // application/x-www-form-urlencoded
    //
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// request interceptor
service.interceptors.request.use(
  (_config) => {
    return _config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    let code = res.code;
    let message = res.message;
    // if the custom code is not 20000, it is judged as an error.
    if (code !== 200) {
      ElMessage({
        type: "error",
        message: "操作失败：" + message || "操作失败：意料之外的结果",
      });
      console.error("接口异常：" + response.config.url);
      console.error("异常信息：" + message);
      console.error("错误码为：" + code);

      return Promise.reject(new Error(message || "Error"));
    } else {
      return res.data || res;
    }
  },
  (error) => {
    console.error(error); // for debug
    ElMessage({
      type: "error",
      message: "服务器开小差啦，请稍后再试～",
    });
    return Promise.reject(error);
  }
);

export default service;
