import requests from "./request";

export const getBaseCategoryList = () => {
  return requests({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};
