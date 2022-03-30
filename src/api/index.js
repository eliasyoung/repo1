import requests from "./request";
import mockRequests from "./mockAxios";

export const getBaseCategoryList = () => {
  return requests({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};

export const getMockBannerData = () => {
  return mockRequests({
    method: "get",
    url: "/banner",
  });
};

export const getMockFloorData = () => mockRequests.get("/floor");

/* export const getSearchListData = (params) => {
  return requests({
    method: "post",
    url: "/list",
    data: params,
  });
}; */
export const getSearchListData = (params) => requests.post("/list", params);

export const getDetailData = (skuId) => {
  return requests({
    method: "get",
    url: `/item/${skuId}`,
  });
};

export const addToCart = (skuId, skuNum) =>
  requests.post(`/cart/addToCart/${skuId}/${skuNum}`);

export const getCartList = () => requests.get("/cart/cartList");
