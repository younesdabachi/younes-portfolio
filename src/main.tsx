import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nProvider } from './i18n/I18n';
import { ThemeProvider } from './hooks/ThemeProvider';
import { MotionProvider } from './hooks/MotionProvider';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>
);
