const useFetch = (url) => {
  const startFetch = async () => {
    const res = await fetch(url);
    const d = await res.text();
    return JSON.parse(d);
  };

  return [startFetch];
};

export default useFetch;
