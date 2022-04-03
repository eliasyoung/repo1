import { nanoid } from "nanoid";

export const throttle = (func, delay) => {
  let valid = true;
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    func.apply(this, arguments);
    setTimeout(() => {
      valid = true;
    }, delay);
  };
};

//防抖
export const debounce = (func, delay) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay);
  };
};

//节流
export const getNanoID = () => {
  let nanoid_token = localStorage.getItem("nanoid_token");
  if (!nanoid_token) {
    nanoid_token = nanoid();
    localStorage.setItem("nanoid_token", nanoid_token);
  }
  return nanoid_token;
};

//匹配正整数
export const checkPostiveInt = (num) => {
  const reg = new RegExp(/^[1-9]\d*$/);
  return reg.test(num);
  // return num.match(/^[1-9]\d*$/)
};
