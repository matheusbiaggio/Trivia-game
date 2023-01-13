const fetchQuestions = async (url) => {
  const apiResponse = await fetch(url);
  const data = (await apiResponse.json());

  return data;
};

export default fetchQuestions;
