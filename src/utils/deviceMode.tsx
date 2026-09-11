import React, { createContext, useContext, useState, useEffect } from "react";

export type DeviceMode = "phone" | "tab" | "pc";

interface DeviceModeContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
}

const DeviceModeContext = createContext<DeviceModeContextType>({
  deviceMode: "pc",
  setDeviceMode: () => {},
});

const STORAGE_KEY = "factlive_device_mode";

export const DeviceModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>(() => {
    if (typeof window === "undefined") return "pc";
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "phone" || saved === "tab" || saved === "pc") {
      return saved;
    }
    return "pc";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, deviceMode);
    } catch (e) {
      console.warn("Failed to persist device mode:", e);
    }
  }, [deviceMode]);

  const setDeviceMode = (mode: DeviceMode) => {
    setDeviceModeState(mode);
  };

  return (
    <DeviceModeContext.Provider value={{ deviceMode, setDeviceMode }}>
      {children}
    </DeviceModeContext.Provider>
  );
};

export const useDeviceMode = () => useContext(DeviceModeContext);
