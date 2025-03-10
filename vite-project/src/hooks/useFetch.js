// import { useEffect, useState,useContext} from "react";
// import { Context } from "../components/utils/context";
// const useFetch = (endpoint) => {
//     const{fetchDataFromApi}=useContext(Context)
//     const [data, setData] = useState();

//     useEffect(() => {
//         makeApiCall();
//     }, [endpoint]);

//     const makeApiCall = async () => {
//         const res = await fetchDataFromApi(endpoint);
//         setData(res);
//     };

//     return { data };
// };
// export default useFetch;
import { useEffect, useState, useContext } from "react";
import { Context } from "../components/utils/context";

const useFetch = (endpoint) => {
  const { fetchDataFromApi } = useContext(Context);
  const [data, setData] = useState(null); // Initial data as null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const makeApiCall = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new call
      try {
        const res = await fetchDataFromApi(endpoint);
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    makeApiCall();
  }, [endpoint, fetchDataFromApi]); // Added fetchDataFromApi

  return { data, isLoading, error };
};

export default useFetch;