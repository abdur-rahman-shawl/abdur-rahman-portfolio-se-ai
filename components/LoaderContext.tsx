'use client';

import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext({
  isLoading: true,
  setIsLoading: (val: boolean) => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
