import React from "react";
import { useDeviceMode } from "../utils/deviceMode";
import { DeviceToggle } from "./DeviceToggle";
import { Smartphone, Tablet, Monitor, RotateCcw } from "lucide-react";

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceMode, setDeviceMode } = useDeviceMode();

  if (deviceMode === "pc") {
    return <div className="w-full min-h-screen flex flex-col">{children}</div>;
  }

  const isPhone = deviceMode === "phone";
  const isTab = deviceMode === "tab";

  return (
    <div className="min-h-screen bg-stone-300/80 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center py-4 px-2 sm:px-4 transition-all">
      {/* Device Viewport Top Control Bar */}
      <div className="sticky top-2 z-50 mb-3 flex flex-wrap items-center justify-between gap-3 bg-stone-900 text-stone-100 dark:bg-stone-800 dark:text-stone-100 border-2 border-stone-700 dark:border-stone-600 px-4 py-2 shadow-xl text-xs font-mono max-w-2xl w-full">
        <div className="flex items-center gap-2">
          {isPhone ? (
            <Smartphone className="h-4 w-4 text-amber-400" />
          ) : (
            <Tablet className="h-4 w-4 text-amber-400" />
          )}
          <span className="font-bold uppercase tracking-wider">
            {isPhone ? "Phone Viewport Simulation (414px)" : "Tab Viewport Simulation (768px)"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <DeviceToggle size="sm" showLabels={true} />
          <button
            type="button"
            onClick={() => setDeviceMode("pc")}
            className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 px-2 py-1 text-[11px] font-bold cursor-pointer transition-colors"
            title="Reset to Full Desktop PC View"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Full PC</span>
          </button>
        </div>
      </div>

      {/* Simulated Device Frame Container */}
      <div
        className={`w-full transition-all duration-300 shadow-2xl overflow-hidden bg-[#FBF9F5] dark:bg-[#121110] border-4 border-stone-900 dark:border-stone-600 flex flex-col ${
          isPhone
            ? "max-w-[420px] rounded-[36px] ring-8 ring-stone-800/30 dark:ring-stone-700/50 my-2"
            : "max-w-[768px] rounded-[24px] ring-8 ring-stone-800/30 dark:ring-stone-700/50 my-2"
        }`}
        style={{ minHeight: "85vh" }}
      >
        {/* Phone Notch/Speaker simulation */}
        {isPhone && (
          <div className="w-full bg-stone-900 text-stone-300 py-1 flex items-center justify-center relative select-none">
            <div className="h-4 w-28 bg-stone-950 rounded-full flex items-center justify-center gap-2 px-2">
              <span className="h-2 w-2 rounded-full bg-stone-800" />
              <span className="h-1.5 w-10 bg-stone-800 rounded-full" />
            </div>
            <span className="absolute right-4 text-[10px] font-mono text-stone-400 font-bold">
              100% ⚡
            </span>
          </div>
        )}

        {/* Tablet Top bezel bar */}
        {isTab && (
          <div className="w-full bg-stone-900 text-stone-300 py-1 flex items-center justify-between px-4 select-none">
            <span className="text-[10px] font-mono text-stone-400 font-bold">
              FACTLIVE TAB EDITION
            </span>
            <div className="h-2 w-2 rounded-full bg-stone-700" />
            <span className="text-[10px] font-mono text-stone-400 font-bold">
              📶 LTE • 100%
            </span>
          </div>
        )}

        {/* Inner Content Area */}
        <div className="w-full flex-1 flex flex-col overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
