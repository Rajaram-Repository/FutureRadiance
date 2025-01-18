import Client from "../../client/Client.js";
import { setNavBarList } from "./Auth";

const baseUrl = "http://localhost:5173";

export const getAccessTokenUsingRefreshToken = async (params) => {
  try {
    const { data } = await Client.post("/refreshToken", params);
    if (data?.statusCode === 200) {
      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      return data?.data?.accessToken;
    } else {
      handleAuthRedirect();
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    handleAuthRedirect();
  }
};

export const getNavList = () => async (dispatch) => {
  try {
    const list = ["home", "contact", "org", "addOrg"];
    dispatch(setNavBarList(list));
    return list;

    /*  
    **After API completed uncomment this **

    const { data } = await Client.get("/navList", {});
    if (data?.statusCode === 200) {
      return data?.data?.nav;
    } else {
      console.error(`Error: Received statusCode ${data?.statusCode}`);
      throw Error("No Nav List.");
    }

    */
  } catch (error) {
    console.error("Error fetching navigation list:", error.message);
  }
};

const handleAuthRedirect = () => {
  localStorage.clear();
  window.location.href = baseUrl;
};
