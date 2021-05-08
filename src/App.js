import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Startup from "./components/Startup";
import {
    DASHBOARD_ROUTE,
} from "./routes";
import DashboardPage from "./components/dashboard/DashboardPage";


function App() {
  return (
      <Startup>
        <Router>
          <CssBaseline />
          <Switch>
            <Route
                path={DASHBOARD_ROUTE}
                component={DashboardPage}
            />
          </Switch>
        </Router>
      </Startup>
  );
}

export default App;