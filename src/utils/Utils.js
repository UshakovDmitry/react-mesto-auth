export const renderLoading = (button, callback, loadingText = "Добавление") => {
  const defaultText = button.textContent;
  button.textContent = loadingText;
  return callback().finally(() => (button.textContent = defaultText));
};


export const checkResponse = (res) =>
res.ok
  ? res.json()
  : Promise.reject(`Ошибка: ${res.status}`);


  export const AUTH_URL = 'https://auth.nomoreparties.co';