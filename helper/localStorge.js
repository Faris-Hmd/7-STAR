export function setLocalStorge(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
export function getLocalStorge(name) {
  if (!localStorage.getItem(name)) return false;
  else return JSON.parse(localStorage.getItem(name));
}
