import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const handleTokenFromHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const tokenFromHash = hash.substring(1).split("&")[0].split("=")[1];
        dispatch({ type: reducerCases.SET_TOKEN, token: tokenFromHash });
      }
    };

    handleTokenFromHash(); // Call the function when the component mounts

    // You can add dependencies to the useEffect if needed
  }, [dispatch]);

  return <div className="App">{token ? <Spotify /> : <Login />}</div>;
}

export default App;
