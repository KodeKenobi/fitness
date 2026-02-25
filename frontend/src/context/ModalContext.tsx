import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalOptions {
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  bullets?: string[];
  buttonText?: string;
  onButtonPress?: () => void;
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useGlobalModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useGlobalModal must be used within a ModalProvider');
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode; renderModal: (options: ModalOptions | null, onDismiss: () => void) => ReactNode }> = ({ children, renderModal }) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const showModal = (options: ModalOptions) => setModalOptions(options);
  const hideModal = () => setModalOptions(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {renderModal(modalOptions, hideModal)}
    </ModalContext.Provider>
  );
};
