export const setNavbarState = () => {
  localStorage.setItem(
    "legacy",
    localStorage.getItem("legacy") == "true" ? "false" : "true"
  );
  window.location.reload();
};

export const getNavbarState = () => {
  return localStorage.getItem("legacy") === "true" ? true : false;
};
