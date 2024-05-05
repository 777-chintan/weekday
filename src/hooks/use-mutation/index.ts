import { useState, useRef } from "react";
import { post, POST, type NETWORK_CONFIG } from "../../utils";

// util function to make API call for differnt methods
const apiCall = async <T>(config: NETWORK_CONFIG) => {
  try {
    let result: T;
    switch (config.options.method) {
      case POST:
        result = await post(config.url, config.options);
        return result;
    }
  } catch (error) {
    throw error;
  }
};

const useMutation = <T, S>(config: NETWORK_CONFIG, retry: number = 1) => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const retryLeft = useRef<number>(retry);

  const fetchData = async (data: S) => {
    try {
      setLoading(true);
      retryLeft.current = retryLeft.current - 1;

      const localConfig = {
        ...config,
        options: {
          ...config.options,
          body: JSON.stringify(data),
        },
      };
      const result: T | null = await apiCall<T>(localConfig);

      setData(result);
      setLoading(false);
      setError(null);
      retryLeft.current = retry;
    } catch (error: any) {
      /**
       * TO DO: retry only in network failure option,
       *        some error do not required refetching
       */

      if (retryLeft.current > 0) {
        await fetchData(data);
      } else {
        setData(null);
        setError(error);
        setLoading(false);
        retryLeft.current = retry;
      }
    }
  };

  const mutateAsync = async (data: S) => {
    setError(null);
    await fetchData(data);
  };

  return { data, loading, error, mutateAsync };
};

export default useMutation;
