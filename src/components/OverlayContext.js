// OverlayContext.js
import React, { createContext, useContext, useState } from 'react';

const OverlayContext = createContext();

export function OverlayProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openOverlay = (overlayContent) => {
    setContent(overlayContent);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <OverlayContext.Provider value={{ isOpen, openOverlay, closeOverlay }}>
        {content}
        {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  return useContext(OverlayContext);
}
