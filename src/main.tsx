import React, {} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './Auth.css'
import AuthProvider from './context/AuthContext.tsx';
import FormOptionsProvider from './context/OptionsTemplateContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <FormOptionsProvider>
        {import.meta.env.VITE_PROD_ENV !== "true" && <section id="bannerAnnouncement">THIS IS A TEST SITE</section>}
        <App/>
        {/* <RouterProvider router={router} /> */}
      </FormOptionsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
