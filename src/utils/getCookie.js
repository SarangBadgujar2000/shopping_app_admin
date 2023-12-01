export const getCookie = (name) => {
  const cookieString = document.cookie;
  const arrOfCookies = cookieString.split("; ");
  for (let i = 0; i < arrOfCookies.length; i++) {
    const [key, value] = arrOfCookies[i].split("=");
    if (key === name) {
      return value;
    }
  }
};
