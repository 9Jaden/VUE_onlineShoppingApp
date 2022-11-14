import { v4 as uuidv4 } from "uuid";
// 生成随机字符串且每次执行不发生变化，游客身份持久存储---利用本地存储
export const getUUID = () => {
  // 先从本地存储获取uuid，看是否有
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    //如果无则生成且存储
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
