export const getItem = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}
export const setItem = (name, data) => {
  return window.localStorage.setItem(name, JSON.stringify(data))
}
export const removeItem = (name) => {
  return window.localStorage.removeItem(name)
}
