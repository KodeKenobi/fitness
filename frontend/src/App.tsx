import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { HomeScreen } from "./screens/Home";
import { theme } from "./styles/Theme";
import { ModalProvider } from "./context/ModalContext";
import { GlobalModal } from "./components/GlobalModal";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <ModalProvider
          renderModal={(options, onDismiss) => 
            options ? (
              <GlobalModal 
                visible={true} 
                onDismiss={onDismiss} 
                {...options} 
              />
            ) : null
          }
        >
          <HomeScreen />
        </ModalProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}