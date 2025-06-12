import jwt from "jsonwebtoken";

export const setAuthKey = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("AuthKey", token);
  }
};

export const isAuthKey = () => {
  if (typeof window !== "undefined") {
    let val = localStorage.getItem("AuthKey");
    return Boolean(val);
  }
};

// get access JWT
export const getAuthKey = () => {
  if (typeof window !== "undefined") {
    let val = localStorage.getItem("AuthKey");
    return val;
  }
};

// clear access and refresh token
export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("AuthKey");
    localStorage.removeItem("currentJob");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("materialInfo");
  }
};

// get logged in user data
export const getUserData = () => {
  let userToken = getAuthKey();
  userToken = userToken?.split("Bearer")[1];
  userToken = String(userToken).trim();
  let data;
  if (userToken) {
    data = jwt.decode(userToken);
  }

  return data;
};

// get logged in user data
// export const getUserID = () => {
//   let data = getUserData();
//   let id = data?.adminuserId || "";
//   return id;
// };

// get logged in user data
export function getUserID() {
  let data = getUserData();
  let id;
  if (data && data?.companyUserId) {
    id = data.companyUserId;
  } else {
    id = data?.userId || "";
  }
  return id;
}

// Create AuditLog Request
export async function createLogRequest(_uData, _activity, _history) {
  let data = _uData;

  let reqObj = {
    userId: data?.userId,
    companyUserId: data?.companyUserId ? data?.companyUserId : data?.userId,
    plantCode: data?.plantCode,
    user: data?.firstName + " " + data?.lastName,
    userEmail: data?.email,
    userRole: data?.userType,
    activity: _activity,
    history: _history,
  };

  return reqObj;
}
