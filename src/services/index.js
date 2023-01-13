export const setLocalStorage = (key, content) => {
  localStorage.setItem(key, JSON.stringify(content));
};

export const fetchQuestions = async (url) => {
  const apiResponse = await fetch(url);
  const data = (await apiResponse.json());

  return data;
};
