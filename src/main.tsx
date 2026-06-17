import React, {} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './context/AuthContext.tsx';
import FormOptionsProvider from './context/OptionsTemplateContext.tsx';
import App from './App.tsx';
import NotificationProvider from './context/NotificationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <FormOptionsProvider>
        <NotificationProvider>
          {import.meta.env.VITE_PROD_ENV !== "true" && <section id="bannerAnnouncement">THIS IS A TEST SITE</section>}
          <App/>
        </NotificationProvider>
      </FormOptionsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
