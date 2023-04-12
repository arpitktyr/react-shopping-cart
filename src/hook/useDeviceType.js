import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("");
  const handleResize = () => {
    const { innerWidth } = window;
    if (innerWidth >= 1024) {
      setDeviceType("desktop");
    } else if (innerWidth >= 768) {
      setDeviceType("tablet");
    } else {
      setDeviceType("mobile");
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;
