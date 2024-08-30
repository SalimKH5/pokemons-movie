import { CapacitorCookies } from '@capacitor/core';

const getCookies = () => {
  return document.cookie;
};

const getCookie = (key: string) => {
	const cookies = getCookies();
	const cookie = cookies.split(';').find((cookie) => {
		return cookie.includes(key);
	});

	return cookie;
};


const initCookie = (key: string) => {
  document.cookie = key + '=[]';
};

const setCookie = (key: string, value: string) => {
    document.cookie = key + '='+value;
};

const setCapacitorCookie = async (url: string, key: string, value: string) => {
  await CapacitorCookies.setCookie({
    url: url,
    key: key,
    value: value,
  });
};

const deleteCookie = async (url: string, key: string) => {
  await CapacitorCookies.deleteCookie({
    url: url,
    key: key,
  });
};

const clearCookiesOnUrl = async (url: string) => {
  await CapacitorCookies.clearCookies({
    url: url,
  });
};

const clearAllCookies = async () => {
  await CapacitorCookies.clearAllCookies();
};

export {
	getCookies,
	getCookie,
	setCapacitorCookie,
	deleteCookie,
    clearCookiesOnUrl,
	clearAllCookies,
	initCookie,
    setCookie
};