import { getConfigJSON, handleErrorResponse } from "./common";
import { AxiosInstance, AxiosInstanceWithoutLoader } from "./http";
import { getAccessJWT, getUserData } from "./TokenServices";

export const makeUrl = (url) => {
  const configJSON = getConfigJSON();
  let BACKEND_URL = configJSON["BACKEND_BASE_URL"];
  if (!url.includes("http")) return BACKEND_URL + "/" + url;
  return url;
};

export const makeFileURL = function (URL) {
  return URL;
};

export const getAPI = (url, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const uData = getUserData();
      const res = await AxiosInstance.get(makeUrl(url), {
        headers: {
          Authorization: accessJWT || undefined,
          typedata: uData?.userSlug,
          userId: uData?.userId,
        },
        params,
      });
      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const postAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const uData = getUserData();
      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          typedata: uData?.userSlug,
          userId: uData?.userId,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const postAPIWL = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const uData = getUserData();
      const res = await AxiosInstanceWithoutLoader.post(
        makeUrl(url),
        formData,
        {
          headers: {
            Authorization: accessJWT || undefined,
            typedata: uData?.userSlug,
            userId: uData?.userId,
          },
        }
      );

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const putAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const uData = getUserData();
      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          typedata: uData?.userSlug,
          userId: uData?.userId,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const deleteAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const uData = getUserData();
      const res = await AxiosInstance.delete(makeUrl(url), {
        headers: {
          Authorization: accessJWT || undefined,
          typedata: uData?.userSlug,
          userId: uData?.userId,
        },
        formData,
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};
