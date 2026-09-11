/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DeepResearch } from "./pages/DeepResearch";
import { Publications } from "./pages/Publications";
import { Reports } from "./pages/Reports";
import { Blog } from "./pages/Blog";
import { ScrollToTop } from "./components/ScrollToTop";
import { ThemeProvider } from "./utils/theme";
import { DeviceModeProvider } from "./utils/deviceMode";
import { DeviceFrame } from "./components/DeviceFrame";

export default function App() {
  return (
    <ThemeProvider>
      <DeviceModeProvider>
        <BrowserRouter>
          <DeviceFrame>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deep-research" element={<DeepResearch />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </DeviceFrame>
        </BrowserRouter>
      </DeviceModeProvider>
    </ThemeProvider>
  );
}
