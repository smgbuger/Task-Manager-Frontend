import { useEffect, useState } from "react";

//custom  hook to fetch data from a provided URL inside a container called baseURL in app.jsx
export const useFetch = (url) => {
  const [data, setData] = useState(null); // state to store a fetched data, initially null

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect hook to perform side effects (data fetching in this case)
  useEffect(() => {
    const getData = async () => {
      //asyn function data
      const response = await fetch(url); // fetch data from provided url
      const jData = await response.json(); //parse response JSON data ndnkeep inside jData
      setData(jData.tasks ? jData.tasks : jData.task); // update the [data] state that was formally null with setData...updating the data with fetched data
      setLoading(false);
      console.log(jData);
    };

    setTimeout(async () => {
      try {
        await getData(); //envoking the getData function
      } catch (error) {
        console.log(error);
        setError("Oops something went wrong");
        setLoading(false);
      }
    }, 3000);
  }, []);

  return { data, setData, loading, error }; // return an object containing data
};
