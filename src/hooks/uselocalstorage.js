"use client";

import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  // Client-side par localStorage se data load karne ke liye
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData !== null) {
        setValue(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("LocalStorage read error:", error);
    }
  }, [key]);

  
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage write error:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;