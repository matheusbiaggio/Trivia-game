export const setLocalStorage = (key, content) => {
  localStorage.setItem(key, JSON.stringify(content))
}