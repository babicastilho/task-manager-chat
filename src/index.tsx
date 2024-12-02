import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from '@components/Layout/Layout';
import Home from '@pages/Home/Home'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Layout>
      <Home />
    </Layout>
  </React.StrictMode>
);
