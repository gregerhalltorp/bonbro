export const jsonFetch = (url, options) => {
  return fetch(url, options)
    .then(response => response.json())
    .catch(err => {
      throw err;
    });
};

export default jsonFetch;
