import { useLayoutEffect, useState } from "react";

function GetScreenHeight() {
  const [screenSize, setScreenSize] = useState([0]);
  
  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerHeight]);
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  
  return screenSize;
}

export default GetScreenHeight;