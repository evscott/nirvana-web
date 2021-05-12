import React from "react";
import { Switch, Route, Router as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Startup from "./components/Startup";
import * as ROUTES from "./routes";
import NoMatchPage from "./components/pages/404/NoMatchPage";
import DashboardPage from "./components/pages/dashboard/DashboardPage";
import AboutPage from "./components/pages/about/AboutPage";
import ShroomsPage from "./components/pages/shrooms/ShroomsPage";
import AcidPage from "./components/pages/acid/AcidPage";


const history = createBrowserHistory();

function App() {
  return (
      <Startup>
        <Router history={history}>
          <CssBaseline />
          <Switch>
            <Route exact path={ROUTES.DASHBOARD_ROUTE} component={DashboardPage}/>
            <Route path={ROUTES.ABOUT_ROUTE} component={AboutPage}/>
            <Route path={ROUTES.SHROOMS_ROUTE} component={ShroomsPage}/>
            <Route path={ROUTES.ACID_ROUTE} component={AcidPage}/>
            <Route path={ROUTES.CONTACT_ROUTE} component={AboutPage}/>
            <Route>
                <NoMatchPage/>
            </Route>
          </Switch>
        </Router>
      </Startup>
  );
}

export default App;