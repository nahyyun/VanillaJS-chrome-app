const setStorage = (LS, setData) => {
    localStorage.setItem(LS, JSON.stringify(setData));
}
const getStorage = (LS) => {
    return JSON.parse(localStorage.getItem(LS));
}
export { setStorage, getStorage };