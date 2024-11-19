"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="relative group">
    <Button onClick={toggleDarkMode}  className="rounded-full h-8 w-8 sm:w-12 sm:h-12">
      {darkMode ? '☀️' : '🌙'} 
    </Button>
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
    {darkMode ? "Light Mode" : "Dark Mode"}
  </div>
    </div>
  );
}
