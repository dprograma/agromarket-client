import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";


const Home = () => {
  // Retrieve csrf token from local storage
  const [csrfToken, setcsrfToken] = useLocalStorage("csrfToken", "");

  useEffect(() => {
    // Fetch CSRF token from backend and set it
    fetch("http://127.0.0.1:8000/api/v1/initialize-request/") 
      .then((res) => res.json())
      .then((data) => setcsrfToken(data.response));
  }, []);

  return <h1>Home Page</h1>;
};

export default Home;
