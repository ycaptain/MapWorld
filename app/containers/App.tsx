import React from "react";
import { Titlebar } from "@/components";

const App: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Titlebar />
      {children}
    </div>
  );
};

export default App;
