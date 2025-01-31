import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LanguageProvider>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </LanguageProvider>
);
