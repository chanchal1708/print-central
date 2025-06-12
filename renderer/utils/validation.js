// Regex for IP Address
export const IP_ADDRESS =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Regex for strings containing only letters (uppercase and lowercase):
export const REGEX_STRING = /^[a-zA-Z]+$/;

// Regex for strings containing only letters (uppercase and lowercase) and spaces:
export const REGEX_STR_SPACE = /^[a-zA-Z\s]+$/;

// Regex for alphanumeric without space
export const REGEX_ALPHANUMERIC_WITHOUT_SPACE = /^[a-zA-Z0-9]*$/;

// Regex for alphanumeric with space
export const REGEX_ALPHANUMERIC_WITH_SPACE = /^(?!\s*$)[a-zA-Z0-9\s]+$/;

// Regex for alphanumeric with Underscore
export const regexAlphanumericUnderscores = /^[a-zA-Z0-9_]+$/;

// Regex for alphanumeric with space & Underscore
export const regexAlphanumericSpacesUnderscores = /^[a-zA-Z0-9\s_]+$/;

// Regex for 10 Digits Mobile No with first digit starting from 6
export const regex_mobile = /^[6-9]\d{9}$/;

// Regex PAN Number
export const regex_PanNumber = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

// Regex Tan Number
export const regex_TanNumber = /[A-Z]{4}[0-9]{5}[A-Z]{1}/;

// Regex GSTIN Number
export const regex_GSTIN_Number =
  /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

// Regex CIN Number
export const regex_CIN_Number =
  /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;

// Regex Email
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Regex Password "Password must have minimum 8 characters, Atleast one uppercase letter,Atleast one lowercase letter, Atleast one number and Atleast one special character",
export const Regex_Password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const Regex_PositiveIntegerOnly = /^[1-9]\d*$/;
export const Regex_PositiveInteger_Atmost2ZeroAfterDecimal =
  /^(?!0$)(?!0\.0$)(?!0\.00$)\d+(\.0{0,2})?$/;
export const REGEX_NAME = /^[a-zA-Z0-9\s]*$/;
export const REGEX_ADDRESS = /^[a-zA-Z0-9\s.,#-]*$/;
export const REGEX_NOTALW_ONLYSPACE = /[^(?!\s+$).+]/;
export const REGEX_PINCODE = /^[1-9][0-9]{5}$/;
export const REGEX_CITY = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
export const REGEX_STATE = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
export const REGEX_COUNTRY = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
export const REGEX_IP_ADDRESS =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const REGEX_MOBILE_NUMBER = /^[0-9]{7,10}$/;
export const REGEX_GTIN = /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/;
export const REGEX_FILE_PATH =
  /^(\/|([a-zA-Z]:)?(\\|\/)[\w\s\-\\\/]+(\.[\w]+)?)$/;
export const REGEX_LINE_CODE = /^[a-zA-Z0-9\-]+$/;
export const REGEX_IPLINE_ADDRESS =
  /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
export const REGEX_PORT = /^[0-9]{1,4}$/;
export const REGIX_PRICE = /^[0-9]+$/;
