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
