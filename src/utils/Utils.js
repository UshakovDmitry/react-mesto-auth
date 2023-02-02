export const renderLoading = (button, callback, loadingText = "Добавление") => {
  const defaultText = button.textContent;
  button.textContent = loadingText;
  return callback().finally(() => (button.textContent = defaultText));
};
