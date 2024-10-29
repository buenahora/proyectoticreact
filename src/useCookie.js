// useCookie.js
import { useState, useEffect } from "react";

const useCookie = (cookieName) => {
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`));

    setCookieValue(cookie ? cookie.split("=")[1] : "");
  }, [cookieName]);

  const setCookie = (value, expirationDays) => {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const deleteCookie = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  return {cookieValue, setCookie, deleteCookie};
};

export default useCookie;