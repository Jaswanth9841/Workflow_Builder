import { PipelineUI } from './ui';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SnackbarProvider 
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            autoHideDuration={3000}
            preventDuplicate
          >
            <div className="h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden transition-colors duration-300">
              <PipelineUI />
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
