

import React, { createContext, useState, useContext } from 'react';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [currentModule, setCurrentModule] = useState('System');
  const [enabledItems, setEnabledItems] = useState({
    System: {},
    Student: {},
    Parent: {},
  });
  const [columns, setColumns] = useState({ name: true, action: true });

  const toggleItem = (module, item) => {
    setEnabledItems((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [item]: !prev[module][item],
      },
    }));
  };

  const toggleColumnVisibility = (column) => {
    setColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <ModuleContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        enabledItems,
        toggleItem,
        columns,
        toggleColumnVisibility,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => {
  return useContext(ModuleContext);
};