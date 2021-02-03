import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App';
import UserManagementPage from './pages/UserManagementPage';
import VendorManagementPage from './pages/VendorManagementPage';
import UserPage from './pages/UserPage';
import { BrowserRouter } from 'react-router-dom';


const Main = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path="/user_manager" component={UserManagementPage} />
        <Route path="/vendor_management" component={VendorManagementPage} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/" component={App} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default Main;
