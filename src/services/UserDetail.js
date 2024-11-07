import ApiClient from "./baseapi";
const userDetail = {
  getAllUser: () => {
    return ApiClient().get("/user/getAll?start=%2C&length=%2C");  
  },
};

export default userDetail;
