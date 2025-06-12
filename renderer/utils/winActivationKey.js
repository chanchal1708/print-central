import { ipcRenderer } from "electron";
import moment from "moment";

const { machineIdSync } = require("node-machine-id");
const CryptoJS = require("crypto-js");
const regedit = require("regedit").promisified;

export const encryptWinKey = (str) => {
  const aesKey = CryptoJS.enc.Utf8.parse("uqpbd6hdiclpbp12");
  const aesIv = CryptoJS.enc.Utf8.parse("0123456789abcdef");

  const aesOptions = {
    iv: aesIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  return CryptoJS.AES.encrypt(str, aesKey, aesOptions).ciphertext.toString();
};

export const decryptWinKey = (cipherStr) => {
  const aesKey = CryptoJS.enc.Utf8.parse("uqpbd6hdiclpbp12");
  const aesIv = CryptoJS.enc.Utf8.parse("0123456789abcdef");

  const aesOptions = {
    iv: aesIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };

  const encoded = { ciphertext: CryptoJS.enc.Hex.parse(cipherStr) };
  var bytes = CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(encoded, aesKey, aesOptions)
  );
  return bytes;
};

export const validateActivationKey = (aKey) => {
  try {
    let _machineId = machineIdSync({ original: true });
    let decryptedData = decryptWinKey(aKey);
    let item = decryptedData.split("|");
    let decodedStr = decryptWinKey(item[0]);
    let decodedKeyArr = decodedStr.split("|");
    let decodedKey = decryptWinKey(decodedKeyArr[0]);
    let _mId = item[1];
    if (_mId && _mId == _machineId && decodedKey == "qriouscodes") {
      var CurrentDate = moment().unix();

      return {
        isExpiryTime: decodedKeyArr[1] > CurrentDate,
        isBufferTime: decodedKeyArr[2] > CurrentDate,
        bufferTime: decodedKeyArr[2],
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const checkActivationKey = async () => {
  try {
    const listregKey = await regedit.list("HKCU\\SOFTWARE");
    console.log("listregKey :>> ", listregKey);
    return;
    let registryData = listregKey["HKCU\\SOFTWARE\\CPL\\printer"];
    // const registryData1 = await ipcRenderer.send(
    //   "check-activation-key",
    //   "HKCU\\SOFTWARE\\CPL\\printer"
    // );
    // let registryData = JSON.parse(registryData1);

    if (registryData?.exists && registryData?.values?.token) {
      let aKey = registryData?.values?.token?.value;
      if (aKey) {
        let validTime = validateActivationKey(aKey);
        return { status: 1, date: validTime };
      } else {
        return { status: 0, date: null };
      }
    } else {
      return { status: 0, date: null };
    }
  } catch (error) {
    console.log(error);
    return { status: 0, date: null };
  }
};
