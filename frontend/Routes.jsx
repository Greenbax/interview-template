import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserManagementPage from "./UserManagementPage";

const Main = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path="/user-management" component={UserManagementPage} />
        <Route path="/" component={App} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default Main;
