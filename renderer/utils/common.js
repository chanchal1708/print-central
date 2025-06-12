import { message } from "antd";
import pincodeData from "@/app/constants/pincode.json";
// import { CONFIG_JSON } from "@pages/api";

import store from "store";
import {
  ERROR_MSG_TYPE,
  INFO_MSG_TYPE,
  SUCCESS_MSG_TYPE,
  WARNING_MSG_TYPE,
} from "@/app/constants/hardData";
import { CONFIG_JSON } from "@/app/api";
// import { allPageRights } from "@redux/rightSlice";
const fs = require("fs");

export const interpolate = function (theString, argumentArray) {
  const regex = /%s/;
  const _r = function (p, c) {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
};

export const displayMessage = function (type, msg) {
  if (type === SUCCESS_MSG_TYPE)
    message.success({
      content: msg,
      duration: 5,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === INFO_MSG_TYPE)
    message.info({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === WARNING_MSG_TYPE)
    message.warning({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === ERROR_MSG_TYPE)
    message.error({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
};

export const startLoadingMessage = function (msg) {
  return message.loading(msg, 0);
};

export const stopLoadingMessage = function (msgFn, finishMsgType, finishMsg) {
  msgFn();
  if (finishMsgType) displayMessage(finishMsgType, finishMsg);
  return true;
};

export const handleErrorResponse = function (error) {
  const { response } = error;
  if (response) {
    const { status } = response;
    if (status === 400) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(response.data.error || ERROR_MESSAGE_400);
      }
    } else if (status === 404) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(ERROR_MESSAGE_404);
      }
    } else if (status === 500) {
      message.error(response.data.error || ERROR_MESSAGE_500);
    }
  } else {
    // message.error(ERROR_INTERNET_CONNECTIVITY);
  }
};

export const stringCapitalize = (stringValue) => {
  if (stringValue) {
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  } else {
    return " ";
  }
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const handleConsoleLog = (shouldLog) => {
  return shouldLog ? console.log.bind(console) : () => {};
};
export const handleConsoleError = (shouldLog) => {
  return shouldLog ? console.error.bind(console) : () => {};
};

export function getConfigJSON() {
  if (!fs.existsSync("data/config.json")) {
    fs.mkdir("data", (error) => {
      if (error) {
        console.log(error);
      } else {
        fs.writeFileSync(
          "data/config.json",
          JSON.stringify(CONFIG_JSON, null, 4),
          "UTF-8"
        );
      }
    });

    return CONFIG_JSON;
  } else {
    let data = fs.readFileSync("data/config.json", "UTF-8");
    return JSON.parse(data);
  }
}

export function uniqueObjInArray(array, key) {
  let temp = [];
  array?.filter((val, ind) => {
    let flag = temp?.filter(
      (v) => String(v[key]).toLowerCase() == String(val[key]).toLowerCase()
    ).length;
    if (!flag) {
      temp.push(val);
    }
  });
  return temp;
}

export function randomString(len) {
  let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let _randomString = "";
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    _randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return _randomString;
}

export const searchPincode = (pincode) => {
  console.log(pincode, "pincodepincodepincode");
  function isNumeric(num) {
    return !isNaN(num);
  }

  if (isNumeric(pincode)) {
    if (typeof pincode == "string") {
      return pincodeData.filter(function (e) {
        return e.pincode == pincode;
      });
    } else if (typeof pincode == "number") {
      return pincodeData.filter(function (e) {
        return e.pincode == pincode;
      });
    }
  } else {
    var regex = RegExp(pincode, "i");
    return pincodeData.filter(function (e) {
      return e.office.match(regex);
    });
  }
};

export const zeroPad = (num, places) => String(num).padStart(places, "0");

export const getRoleNameByID = (_roleList, _roleId) => {
  let roleName = _roleList?.reduce((acc, role) => {
    return Number(role.RoleId) === Number(_roleId) ? role.RoleName : acc;
  }, null);
  return roleName;
};

// export const usePageAccess = (pageId, rightIds) => {
//   const userRights = allPageRights(store.getState());
//   const pageRights =
//     userRights.find((page) => page.PageId === pageId)?.Rights || [];

//   const allElementsExist = rightIds.some((element) =>
//     pageRights.includes(element)
//   );
//   return allElementsExist;
// };

export const checkDiffInObjectsStatus = (obj1, obj2) => {
  let res = "";
  obj1 = obj1 ? obj1 : {};
  obj2 = obj2 ? obj2 : {};
  let index = 0;
  for (const [key, value] of Object.entries(obj1)) {
    index++;
    if (value != obj2[key]) {
      if (
        ![
          "ForcedPasswordReset",
          "PasswordExpiry",
          "WrongPassword",
          "Locked",
          "id",
          "IsUsed",
          "PasswordLastChanged",
          "PasswordHistory",
          "FileHistory",
        ]?.includes(key)
      ) {
        res += `<tr key="${index}">
                <td class="mb-2">${key}</td>
                <td class="mb-2">
                  ${
                    key == "ProductionStatus"
                      ? value == 0
                        ? "Ready"
                        : value == 1
                        ? "Running"
                        : value == 2
                        ? "Stopped"
                        : value == 10
                        ? "Completed"
                        : null
                      : [0, 1, "0", "1"]?.includes(value)
                      ? Boolean(Number(value))
                      : value
                  }
                </td>
                <td class="mb-2">
                  ${
                    key == "ProductionStatus"
                      ? obj2[key] == 0
                        ? "Ready"
                        : obj2[key] == 1
                        ? "Running"
                        : obj2[key] == 2
                        ? "Stopped"
                        : obj2[key] == 10
                        ? "Completed"
                        : null
                      : [0, 1, "0", "1"]?.includes(obj2[key])
                      ? Boolean(Number(obj2[key]))
                      : obj2[key]
                  }
                </td>
              </tr>`;
      }
    }
  }

  let tbl = `<table class="html_table html_table_border html_table_small_2">
            <thead>
              <tr>
                <th>key</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              ${res}
            </tbody>
          </table>`;
  return res ? tbl : "No Change";
};

export const checkDiffInObjects = (obj1, obj2, _api) => {
  let res = "";
  obj1 = obj1 ? obj1 : {};
  obj2 = obj2 ? obj2 : {};
  let index = 0;

  for (const [key, value] of Object.entries(obj1)) {
    index++;
    if (value != obj2[key]) {
      if (
        ![
          "ForcedPasswordReset",
          "PasswordExpiry",
          "WrongPassword",
          "Locked",
          "id",
          "IsUsed",
          "PasswordLastChanged",
          "PasswordHistory",
          "FileHistory",
        ]?.includes(key)
      ) {
        if (String(_api)?.includes("updateTemplateNameInProduction")) {
          if (key == "TemplateName") {
            res += `<tr key="${index}">
            <td class="mb-2">${key}</td>
            <td class="mb-2">
              ${
                [0, 1, "0", "1"]?.includes(value)
                  ? Boolean(Number(value))
                  : value
              }
            </td>
            <td class="mb-2">
              ${
                [0, 1, "0", "1"]?.includes(obj2[key])
                  ? Boolean(Number(obj2[key]))
                  : obj2[key]
              }
            </td>
          </tr>`;
          }
        } else if (String(_api)?.includes("approveProduction")) {
          if (key == "Approved") {
            res += `<tr key="${index}">
            <td class="mb-2">Approval Status</td>
            <td class="mb-2">
              ${
                value == 0
                  ? "Under Approval"
                  : value == 1
                  ? "Approved"
                  : value == 2
                  ? "Rejected"
                  : null
              }
            </td>
            <td class="mb-2">
              ${
                obj2[key] == 0
                  ? "Under Approval"
                  : obj2[key] == 1
                  ? "Approved"
                  : obj2[key] == 2
                  ? "Rejected"
                  : null
              }
            </td>
          </tr>`;
          } else {
            res += `<tr key="${index}">
          <td class="mb-2">${key}</td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(value) ? Boolean(Number(value)) : value
            }
          </td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(obj2[key])
                ? Boolean(Number(obj2[key]))
                : obj2[key]
            }
          </td>
        </tr>`;
          }
        } else if (
          String(_api)?.includes("updateProductionStatus") ||
          String(_api)?.includes("closeProduction")
        ) {
          if (key == "ProductionStatus") {
            res += `<tr key="${index}">
            <td class="mb-2">Production Status</td>
            <td class="mb-2">
              ${
                value == 0
                  ? "Not Running"
                  : value == 1
                  ? "Running"
                  : value == 2
                  ? "Stopped"
                  : value == 10
                  ? "Completed"
                  : null
              }
            </td>
            <td class="mb-2">

             ${
               obj2[key] == 0
                 ? "Not Running"
                 : obj2[key] == 1
                 ? "Running"
                 : obj2[key] == 2
                 ? "Stopped"
                 : obj2[key] == 10
                 ? "Completed"
                 : null
             }
             
            </td>
          </tr>`;
          } else {
            res += `<tr key="${index}">
          <td class="mb-2">${key}</td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(value) ? Boolean(Number(value)) : value
            }
          </td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(obj2[key])
                ? Boolean(Number(obj2[key]))
                : obj2[key]
            }
          </td>
        </tr>`;
          }
        } else {
          res += `<tr key="${index}">
          <td class="mb-2">${key}</td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(value) ? Boolean(Number(value)) : value
            }
          </td>
          <td class="mb-2">
            ${
              [0, 1, "0", "1"]?.includes(obj2[key])
                ? Boolean(Number(obj2[key]))
                : obj2[key]
            }
          </td>
        </tr>`;
        }
      }
    }
  }

  // return res ? res : "No Change";

  let tbl = `<table class="html_table html_table_border html_table_small_2">
            <thead>
              <tr>
                <th>key</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              ${res}
            </tbody>
          </table>`;
  return res ? tbl : "No Change";
};

export const printKeyValueData = (obj1) => {
  let res = "";
  obj1 = obj1 ? obj1 : {};
  let index = 0;
  for (const [key, value] of Object.entries(obj1)) {
    index++;
    if (
      ![
        "ForcedPasswordReset",
        "PasswordExpiry",
        "WrongPassword",
        "Locked",
        "id",
        "IsUsed",
        "PasswordLastChanged",
        "PasswordHistory",
        "UID",
        "LineCode",
        "Variance",
        "ProductionStatus",
        "PrintedSize",
        "ScannedSize",
        "RejectedSize",
        "StorageCondition",
        "Approved",
        "ApprovedBy",
        "Reviewed",
        "ReviewedBy",
        "Active",
      ]?.includes(key)
    ) {
      res += `<tr key="${index}">
                  <td class="mb-2">${key}</td>
                  <td class="mb-2">
                    ${
                      0 == value || 1 == value || "0" == value || "1" == value
                        ? [
                            "Status",
                            "Active",
                            "Reviewed",
                            "Approved",
                          ]?.includes(key)
                          ? Boolean(Number(value))
                          : value
                        : typeof value == "object"
                        ? JSON.stringify(value, null, 4)
                        : isNaN(value)
                        ? value
                        : Number(value)
                    }
                  </td>
              </tr>`;
    }
  }

  let tbl = `<table class="html_table html_table_border html_table_small_2">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${res}
            </tbody>
          </table>`;

  return res ? tbl : "No Change";
};

export const printKeyValueDataQr = (obj1) => {
  let res = "";
  obj1 = obj1 ? obj1 : {};
  let index = 0;
  for (const [key, value] of Object.entries(obj1)) {
    index++;
    if (
      ![
        "ForcedPasswordReset",
        "PasswordExpiry",
        "WrongPassword",
        "Locked",
        "id",
        "IsUsed",
        "PasswordLastChanged",
        "PasswordHistory",
        "UID",
      ]?.includes(key)
    ) {
      res += `<tr key="${index}">
                  <td class="mb-2">${key}</td>
                  <td class="mb-2">
                    ${
                      0 == value || 1 == value || "0" == value || "1" == value
                        ? [
                            "Status",
                            "Active",
                            "Reviewed",
                            "Approved",
                          ]?.includes(key)
                          ? Boolean(Number(value))
                          : value
                        : typeof value == "object"
                        ? JSON.stringify(value, null, 4)
                        : isNaN(value)
                        ? value
                        : Number(value)
                    }
                  </td>
              </tr>`;
    }
  }

  let tbl = `<table class="html_table html_table_border html_table_small_2">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${res}
            </tbody>
          </table>`;

  return res ? tbl : "No Change";
};

// dateStr = "241130";
export const dateStringToDate = (dateStr) => {
  const year = parseInt(dateStr.slice(0, 2), 10);
  const month = parseInt(dateStr.slice(2, 4), 10) - 1;
  const day = parseInt(dateStr.slice(4), 10);

  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  // Create Date object
  const date = new Date(fullYear, month, day);
  return date;
};

export const splitArrayInTwoPart = (arr) => [
  arr.slice(0, (arr.length + 1) >> 1),
  arr.slice((arr.length + 1) >> 1),
];

function parseCsv(data) {
  const res = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi;
  const result = [[]];
  let matches;
  while ((matches = res.exec(data))) {
    if (matches[1].length && matches[1] !== ",") {
      result.push([]);
    }
    result[result.length - 1].push(
      matches[2] !== undefined ? matches[2].replace(/""/g, "") : matches[3]
    );
  }
  return result;
}

function arrayToObject(csvArray) {
  const headers = csvArray.shift();

  return csvArray.map((row) =>
    headers.reduce(
      (acc, currentHeader, i) => ({ ...acc, ...{ [currentHeader]: row[i] } }),
      {}
    )
  );
}
