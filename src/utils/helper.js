import { Toastify } from "@/components/toastify";

const setCookie = (name, value, time) => {
  const date = new Date();
  date.setTime(date.getTime() +  time); // Convert days to milliseconds
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
};
//   get token using cookie
const getCookie = (name) => {
    const cookieString = typeof document !== 'undefined' ? document.cookie : '';
  const cookieArr = cookieString.split(";");

  for (let cookie of cookieArr) {
    cookie = cookie.trim();
    // console.log(cookie,"wehy get");
    if (cookie.startsWith(`${name}=`)) {

      return cookie.split("=")[1];
    }
  }
  return null; // Return null if the cookie is not found
};
//   remove token from cookie
const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}; 
export const getToken = () => {
   
 const token =  getCookie("zanvision_lab_landing_token"); 
  return  token;
};

/* set token */
export const setToken = (token) => {
  return setCookie("zanvision_lab_landing_token", token, 7 * 60 * 60 * 1000);
  // return localStorage.setItem("token", token);
};

/* remove token */
export const removeToken = () => {
  return removeCookie("zanvision_lab_landing_token");
};

export const responseCheck = (response) => {
  if ((response && response.status == 200) || response.status == 201) {
    return true;
  } else {
    return false;
  }
};
 
// error handler function 
export const errorHandler = (error) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errors
  ) {
    error.response.data.errors.map((item) => {
      return Toastify.Error(error?.response?.data?.errors[0]);
    });
  } else {
    return Toastify.Error("Something going wrong, Try again.");
  }
};
