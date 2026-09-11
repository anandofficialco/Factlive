import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { useDeviceMode, DeviceMode } from "../utils/deviceMode";

interface DeviceToggleProps {
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md";
}

export const DeviceToggle: React.FC<DeviceToggleProps> = ({
  className = "",
  showLabels = true,
  size = "md",
}) => {
  const { deviceMode, setDeviceMode } = useDeviceMode();

  const options: { mode: DeviceMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    {
      mode: "phone",
      label: "Phone",
      icon: <Smartphone className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />,
      tooltip: "Switch to Phone mobile viewport (390px)",
    },
    {
      mode: "tab",
      label: "Tab",
      icon: <Tablet className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />,
      tooltip: "Switch to Tablet viewport (768px)",
    },
    {
      mode: "pc",
      label: "PC",
      icon: <Monitor className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />,
      tooltip: "Switch to PC desktop full viewport",
    },
  ];

  return (
    <div
      id="device-viewport-toggle"
      className={`inline-flex items-center border-2 border-stone-900 dark:border-stone-500 bg-[#F4EFE6] dark:bg-[#1A1817] p-0.5 rounded-none shadow-xs transition-colors ${className}`}
      role="group"
      aria-label="Device Viewport Switcher"
    >
      {options.map(({ mode, label, icon, tooltip }) => {
        const isActive = deviceMode === mode;
        return (
          <button
            key={mode}
            type="button"
            id={`btn-device-${mode}`}
            onClick={() => setDeviceMode(mode)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 font-mono font-bold transition-all cursor-pointer select-none ${
              size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
            } ${
              isActive
                ? "bg-stone-900 text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-stone-950 shadow-xs"
                : "text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
            }`}
            title={tooltip}
          >
            <span className={isActive ? "text-amber-400 dark:text-amber-600 scale-105" : "text-stone-500"}>
              {icon}
            </span>
            {showLabels && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
};
