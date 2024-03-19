export const isLoggedIn = () => {
  return (
    localStorage.getItem("LoggedInEmail") != null &&
    localStorage.getItem("LoggedInEmail") != undefined
  );
};

export const getEmailId = () => {
  return localStorage.getItem("LoggedInEmail");
};

export const getUserName = () => {
  return localStorage.getItem("UserName");
};

export const isAdminLogin = () => {
  return localStorage.getItem("adminLogin") === "true";
};
