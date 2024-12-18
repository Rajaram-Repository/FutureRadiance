// import Client from "../../client/Client.js";
import { dummyOrgData } from "../../component/utils/DummyData.js";
import { setOrgList, setOrgLoading } from "./Org.js";

export const getOrg = (params) => async (dispatch) => {
  try {
    dispatch(setOrgLoading(true));
    /**
     * After API completed comment this 2 lines
     */
    dispatch(setOrgList(dummyOrgData));
    console.log(params);

    /** 
     * Uncomment this 
     * 
      const { data } = await Client.post("/getOrg", params);
      if (data?.statusCode === 200) {
        dispatch(setOrgList(data?.data));
        return;
      }
      console.error(`status code != 200 : ${data}`);
      dispatch(setOrgList([]));
    */
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    dispatch(setOrgLoading(false));
  }
};
