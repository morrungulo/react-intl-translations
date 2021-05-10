import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource");
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setIsError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setData(null);
          setIsPending(false);
          setIsError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, isError, setData };
}

export default useFetch;